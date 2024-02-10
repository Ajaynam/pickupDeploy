import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiCreateNewCustomer } from '../../../services/CustomerService'
import {  apiAllCustomerList } from '../../../services/CustomerService';


export const getAllCustomer = createAsyncThunk(
    'customer/data/get',
    async (data) => {
        try {
            const response = await apiAllCustomerList(data)
            console.log(response)
            return response
        } catch (error) {
            return error?.response;
        }
    }
)

export const getAdminCreateNewCustomer = createAsyncThunk(
    // 'shop/owner/data/add',
    'customer/data/add',
    async (data) => {
        try {
            const response = await apiCreateNewCustomer(data)
            return response
        } catch (error) {
            return error?.response || error.toString()
        }
    }
)




export const uploadImage = createAsyncThunk(
    'shop/owner/data/image',
    async (data) => {
        try {
            // const response = await apiImageUploadSingle(data)
            const response = ''
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


export const initialFilterData = {
    status: ''
}

const dataSlice = createSlice({
    name: 'shop/owner/data',
    initialState: {
        loading: false ,
        message: '',
        shopOwnerList: [],
        tableData: initialTableData,
        filterData: initialFilterData,
        shopOwnerList: [],
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
        [getAdminCreateNewCustomer.fulfilled]: (state, action) => { },
        [uploadImage.fulfilled]: (state, action) => { },
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
// export const { } = dataSlice.actions

export default dataSlice.reducer
