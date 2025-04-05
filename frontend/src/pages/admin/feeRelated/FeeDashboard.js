import React, { useEffect } from "react";
import { Box, Button, Typography, Grid, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllFees } from "../../../redux/feeRelated/feeHandle";

const FeeDashboard = () => {
    const dispatch = useDispatch();
    const { response: fees, status } = useSelector(state => state.fee);

    useEffect(() => {
        dispatch(fetchAllFees());
    }, [dispatch]);

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                Fee Management
            </Typography>

            <Button
                component={Link}
                to="/Admin/fees/set"
                variant="contained"
                color="primary"
                sx={{ marginBottom: 2 }}
            >
                Set Fees for Class
            </Button>

            {/* Display Fees in Vibrant Boxes */}
            <Grid container spacing={3}>
                {status === "loading" ? (
                    <Typography>Loading...</Typography>
                ) : fees?.length > 0 ? (
                    fees.map(fee => (
                        <Grid item xs={12} sm={6} md={4} key={fee._id}>
                            <Paper elevation={6} sx={{ padding: 2, backgroundColor: "#e3f2fd" }}>
                                <Typography variant="h6">
                                    {fee.classID.sclassName}
                                </Typography>
                                <Typography variant="body1">
                                    Fee: ₹{fee.amount}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))
                ) : (
                    <Typography>No fees available</Typography>
                )}
            </Grid>
        </Box>
    );
};

export default FeeDashboard;
