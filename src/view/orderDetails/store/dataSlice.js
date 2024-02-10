import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiOrderConfirmation, apiOrderDetailsByOrderId } from '../../../services/OrderService';


export const getOrderDetailsByOrderId = createAsyncThunk(
    'orderDetails/data/get',
    async (data) => {
        try {
            const response = await apiOrderDetailsByOrderId(data)
            return response
        } catch (error) {
            return error?.response || error.toString()
        }
    }
)


export const putOrderStatusByOrderId = createAsyncThunk(
    'orderDetails/data/put/status',
    async (data) => {
        try {
            const response = await apiOrderConfirmation(data)
            return response
        } catch (error) {
            return error?.response || error.toString()
        }
    }
)

const dataSlice = createSlice({
    name: 'orderDetails/data',
    initialState: {
        loading: false,
        orderDetails: {}
    },

    reducers: {

    },
    extraReducers: {
        [getOrderDetailsByOrderId.fulfilled]: (state, action) => {
            state.loading = false
            state.orderDetails = action.payload?.data?.data
        },

        [getOrderDetailsByOrderId.pending]: (state) => {
            state.loading = true
        },
        [putOrderStatusByOrderId.fulfilled]: (state) => {
        },

    },
})

// export const { } =
//     dataSlice.actions

export default dataSlice.reducer
