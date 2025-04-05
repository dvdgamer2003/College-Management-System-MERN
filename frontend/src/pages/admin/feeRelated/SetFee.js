import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setClassFee } from '../../../redux/feeRelated/feeHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import { resetFeeState } from '../../../redux/feeRelated/feeSlice';
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
import { CircularProgress } from '@mui/material';
import Popup from '../../../components/Popup';

const SetFee = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, response, error } = useSelector(state => state.fee);
    const { currentUser } = useSelector(state => state.user);
    const { sclassesList } = useSelector(state => state.sclass);

    const [classID, setClassID] = useState('');
    const [amount, setAmount] = useState('');
    const [dueDate, setDueDate] = useState(''); // Added dueDate state
    const adminID = currentUser._id;

    const [loader, setLoader] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        dispatch(getAllSclasses(adminID, "Sclass"));
    }, [dispatch, adminID]);

    useEffect(() => {
        console.log("Component Mounted! Resetting Status...");
        dispatch(underControl());
        dispatch(getAllSclasses(adminID, "Sclass"));
    }, [dispatch, adminID]);

    const fields = { classID, amount, adminID, dueDate }; // Added dueDate to the fields

    const submitHandler = (event) => {
        event.preventDefault();
        if (!classID) {
            setMessage("Please select a class.");
            setShowPopup(true);
            return;
        }
        setLoader(true);
        dispatch(setClassFee(fields));
    };

    useEffect(() => {
        console.log("Status changed:", status);

        if (status === 'added') {
            setMessage("Fee set successfully!");
            setShowPopup(true);
            setLoader(false);
            setTimeout(() => {
                navigate('/Admin/fees', { replace: true });
            }, 1000);

            dispatch(resetFeeState());

        } else if (status === 'error') {
            setMessage(error || "Network Error");
            setShowPopup(true);
            setLoader(false);
            dispatch(resetFeeState());
        }
    }, [status, navigate, error, response, dispatch]);

    return (
        <>
            <div className="register">
                <form className="registerForm" onSubmit={submitHandler}>
                    <span className="registerTitle">Set Class Fees</span>

                    <label>Class</label>
                    <select
                        className="registerInput"
                        value={classID}
                        onChange={(event) => setClassID(event.target.value)}
                        required
                        style={{ color: "blue" }}
                    >
                        <option value="" style={{ color: "black" }}>
                            Select Class
                        </option>
                        {Array.isArray(sclassesList) && sclassesList.length > 0 ? (
                            sclassesList.map((sclass) => (
                                <option
                                    key={sclass._id}
                                    value={sclass._id}
                                    style={{ color: "green" }}
                                >
                                    {sclass.sclassName}
                                </option>
                            ))
                        ) : (
                            <option disabled>No classes available</option>
                        )}
                    </select>

                    <label>Amount</label>
                    <input
                        className="registerInput"
                        type="number"
                        placeholder="Enter Fee Amount..."
                        value={amount}
                        onChange={(event) => setAmount(event.target.value)}
                        required
                    />

                    <label>Due Date</label> {/* New due date field */}
                    <input
                        className="registerInput"
                        type="date"
                        value={dueDate}
                        onChange={(event) => setDueDate(event.target.value)}
                        required
                    />

                    <button className="registerButton" type="submit" disabled={loader}>
                        {loader ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            "Set Fees"
                        )}
                    </button>
                </form>
            </div>
            <Popup
                message={message}
                setShowPopup={setShowPopup}
                showPopup={showPopup}
            />
        </>
    );
};

export default SetFee;
