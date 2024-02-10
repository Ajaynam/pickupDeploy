import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiAllOrder } from '../../../services/OrderService'

export const getAllOrder = createAsyncThunk(
    'orderList/data/order',
    async (data) => {
        try {
            const response = await apiAllOrder(data)
            return response
        } catch (error) {
            return error?.response || error.toString()
        }
    }
)


export const initialTableData = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    query: '',
}

const dataSlice = createSlice({
    name: 'orderList/data',
    initialState: {
        loading: false,
        orderList: [],
        tableData: initialTableData,
    },
    reducers: {
        setOrderList: (state, action) => {
            state.orderList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
    },
    extraReducers: {
        [getAllOrder.fulfilled]: (state, action) => {
            state.orderList = action.payload?.data?.data
            state.tableData.total = action.payload?.data?.total
            state.loading = false
        },
        [getAllOrder.pending]: (state) => {
            state.loading = true
        },
        [getAllOrder.rejected]: (state) => {
            state.loading = false
        },
    },
})

export const { setOrderList, setTableData } = dataSlice.actions

export default dataSlice.reducer
