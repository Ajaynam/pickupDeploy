import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiAllShop, apiChangePasswordByShopId } from '../../../services/ShopService';


export const getAllShop = createAsyncThunk(
    'shop/data/get',
    async (data) => {
        try {
            const response = await apiAllShop(data)
            return response
        } catch (error) {
            return error?.response;
        }
    }
)


export const putShopPassword = createAsyncThunk(
    'shop/data/change/password',
    async (data) => {
        try {
            const response = await apiChangePasswordByShopId(data)
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
    name: 'shop/data',
    initialState: {
        loading: false,
        message: '',
        shopList: [],
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

        [getAllShop.fulfilled]: (state, action) => {
            state.loading = false
            state.shopList = action.payload?.data?.data || []
            state.tableData.total = action.payload?.data?.total
        },
        [getAllShop.pending]: (state) => {
            state.loading = true
        },
        [getAllShop.rejected]: (state) => {
            state.loading = false
            state.shopList = []
            state.tableData.total = 0
        }
    },
})

export const { setTableData, setFilterData } =
    dataSlice.actions

export default dataSlice.reducer
