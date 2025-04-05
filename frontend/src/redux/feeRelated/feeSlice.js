// feeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const feeSlice = createSlice({
    name: 'fee',
    initialState: {
        status: 'idle',
        response: null,
        error: null
    },
    reducers: {
        feeControl: (state, action) => {
            return { ...state, ...action.payload };
        },
        resetFeeState: (state) => {
            state.status = 'idle';
            state.response = null;
            state.error = null;
        }
    }
});

export const { feeControl, resetFeeState } = feeSlice.actions;
export const feeReducer = feeSlice.reducer;