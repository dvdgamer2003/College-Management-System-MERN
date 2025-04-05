import axios from 'axios';
import { feeControl } from './feeSlice';

// Action to set fees for a class
export const setClassFee = (fields) => async (dispatch) => {
    dispatch(feeControl({ status: "loading" }));

    try {
        const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/Admin/fees/setFee`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });

        console.log("API Response:", result.data);  // Debugging log

        if (result.data.error) {  // Correct condition
            dispatch(feeControl({ status: "error", error: result.data.error }));
        } else {
            dispatch(feeControl({ status: "added", response: result.data }));
        }
    } catch (error) {
        dispatch(feeControl({ status: "error", error: "Network Error" }));
    }
};


// Fetch all class fees (Admin Dashboard)
export const fetchAllFees = () => async (dispatch) => {
    dispatch(feeControl({ status: "loading" }));

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/Admin/fees/all`);
        dispatch(feeControl({ status: "success", response: result.data }));
    } catch (error) {
        dispatch(feeControl({ status: "error", error: "Network Error" }));
    }
};

// Fetch fee for a specific class
export const fetchClassFee = (classID) => async (dispatch) => {
    console.log(`fetchClassFee called with classID: ${classID}`);
    
    dispatch(feeControl({ status: "loading" }));

    try {
        const url = `${process.env.REACT_APP_BASE_URL}/fees/get/${classID}`;
        console.log(`Fetching data from: ${url}`);
        
        const result = await axios.get(url);
        console.log("API Response:", result.data);

        if (result.data.message) {
            console.warn("Error response received:", result.data.message);
            dispatch(feeControl({ status: "error", error: result.data.message }));
        } else {
            console.log("Dispatching success:", result.data);
            dispatch(feeControl({ status: "success", response: result.data }));
        }
    } catch (error) {
        console.error("Network Error:", error.message);
        dispatch(feeControl({ status: "error", error: "Network Error" }));
    }
};
