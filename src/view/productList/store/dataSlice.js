import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiAddStockInExistingProduct, apiAllProductsList } from '../../../services/ProductService'
import { apiAllCategoryList } from '../../../services/CategoryService'

export const getAllProductList = createAsyncThunk(
    'productList/data/all',
    async (data) => {
        try {
            const response = await apiAllProductsList(data)
            return response
        } catch (error) {
            return error?.response || error.toString()
        }
    }
)
export const getAllCategoryList = createAsyncThunk(
    'new/order/data/category',
    async (data) => {
        try {
            const response = await apiAllCategoryList(data)
            return response
        } catch (error) {
            return error?.response || error.toString()
        }
    }
)


export const addStockInExistingProduct = createAsyncThunk(
    'new/order/data/add/stock',
    async (data) => {
        try {
            const response = await apiAddStockInExistingProduct(data)
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
export const initialFilterData = ''

const dataSlice = createSlice({
    name: 'productList/data',
    initialState: {
        loading: false,
        productList: [],
        tableData: initialTableData,
        categoryList:[],
        filterData:initialFilterData
    },
    reducers: {
        setOrderList: (state, action) => {
            state.orderList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setFilterData: (state, action) => {
        
            state.filterData = action.payload
        },
    },
    extraReducers: {
        [getAllProductList.fulfilled]: (state, action) => {
            state.productList = action.payload?.data?.data
            state.tableData.total = action.payload?.data?.total
            state.loading = false
        },
        [getAllProductList.pending]: (state) => {
            state.loading = true
        },
        [getAllProductList.rejected]: (state) => {
            state.loading = false
        },
        [getAllCategoryList.fulfilled]: (state, action) => {
            state.categoryList = action.payload?.data?.data || []
        },
    },
})

export const { setOrderList, setTableData,setFilterData } = dataSlice.actions

export default dataSlice.reducer
