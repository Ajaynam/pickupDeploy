import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {  apiAllProductMasterList } from '../../../services/ProductMasterService';


export const getAllProduct = createAsyncThunk(
    'PoProduct/data/get',
    async (data) => {
        try {
            const response = await apiAllProductMasterList(data)
            console.log(response)
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

        [getAllProduct.fulfilled]: (state, action) => {
            // console.log(getAllProduct)
            state.loading = false
            state.shopOwnerList = action.payload?.data?.data || []
            console.log(state.shopOwnerList)
            state.tableData.total = action.payload?.data?.total
        },
        [getAllProduct.pending]: (state) => {
            state.loading = true
        },
        [getAllProduct.rejected]: (state) => {
            state.loading = false
            state.shopOwnerList = []
            state.tableData.total = 0
        }
    },
})

export const { setTableData, setFilterData } =
    dataSlice.actions

export default dataSlice.reducer
