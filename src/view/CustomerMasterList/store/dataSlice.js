import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {  apiAllCustomerList } from '../../../services/CustomerService';


export const getAllCustomer = createAsyncThunk(
    'customer/data/get',
    async (data) => {
        try {
            const response = await apiAllCustomerList(data)
            return response
        } catch (error) {
            return error?.response;
        }
    }
)


export const initialTableData = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    query: '',
}


export const initialFilterData = {
    status: ''
}

const dataSlice = createSlice({
    name: 'shopOwner/data',
    initialState: {
        loading: false,
        message: '',
        shopOwnerList: [],
        tableData: initialTableData,
        filterData: initialFilterData,
    },
    reducers: {
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setFilterData: (state, action) => {
            state.filterData = action.payload
        },
    },
    extraReducers: {

        [getAllCustomer.fulfilled]: (state, action) => {
            state.loading = false
            state.shopOwnerList = action.payload?.data?.data || []
            state.tableData.total = action.payload?.data?.total
        },
        [getAllCustomer.pending]: (state) => {
            state.loading = true
        },
        [getAllCustomer.rejected]: (state) => {
            state.loading = false
            state.shopOwnerList = []
            state.tableData.total = 0
        }
    },
})

export const { setTableData, setFilterData } =
    dataSlice.actions

export default dataSlice.reducer
