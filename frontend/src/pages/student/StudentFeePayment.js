import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, Typography, Button, CircularProgress, Alert } from "@mui/material";

import { fetchClassFee } from "../../redux/feeRelated/feeHandle";

const StudentFeePayment = () => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user); // Fetch student details
    const { status, response, error } = useSelector((state) => state.fee); // Fee details

    console.log("currentUser:", currentUser);
    console.log("currentUser sclass name:", currentUser.sclassName);
    console.log("currentUser _id:", currentUser.sclassName._id);
    console.log("Redux Fee State:", { status, response, error });

    useEffect(() => {
        if (currentUser.sclassName._id) {  // Ensure classID is available before dispatching
            console.log("Dispatching fetchClassFee for classID:", currentUser.sclassName._id);
            dispatch(fetchClassFee(currentUser.sclassName._id));

        } else {
            console.warn("ClassID not available, skipping fetchClassFee dispatch.");
        }
    }, [dispatch, currentUser.sclassName._id]);

    const handlePayment = () => {
        alert("Redirecting to Payment Gateway... (Integrate Razorpay/Stripe)");
    };

    if (status === "loading") return <CircularProgress />;
    if (status === "error") return <Alert severity="error">{error}</Alert>;

    return (
      <Card sx={{ maxWidth: 500, margin: "auto", mt: 5, p: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Fee Payment Details
          </Typography>
          {response ? (
            <>
              <Typography variant="body1">
                <strong>Class:</strong> {currentUser.sclassName.sclassName}
              </Typography>
              <Typography variant="body1">
                <strong>Fee Amount:</strong> {response?.amount ?? "Not yet set"}
              </Typography>
              <Typography variant="body1">
                <strong>Status:</strong> {currentUser.fees.status ?? "N/A"}
              </Typography>
              <Typography variant="body1" sx={{ color: "red", mt: 1 }}>
                Due Date:{" "}
                {response?.dueDate
                  ? new Date(response.dueDate).toLocaleDateString("en-GB")
                  : "Not Available"}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 3 }}
                onClick={handlePayment}
                disabled={response?.status === "Paid"}
              >
                {currentUser.fees.status === "Paid" ? "Fee Paid" : "Pay Now"}
              </Button>
            </>
          ) : (
            <Typography variant="body1" sx={{ color: "red", mt: 1 }}>
              No fee data available.
            </Typography>
          )}
        </CardContent>
      </Card>
    );
};

export default StudentFeePayment;
