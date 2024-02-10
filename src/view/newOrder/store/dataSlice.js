import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiAllCategoryList } from '../../../services/CategoryService'
import { apiAllProductsByCategoryId } from '../../../services/ProductService'
import { apiAllShopOfPlaceOrder } from '../../../services/ShopService'
import { apiPlaceOrder } from '../../../services/OrderService'
import { apiAllCustomerList } from '../../../services/CustomerService'

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
export const getAllProductsByCategoryId = createAsyncThunk(
    'new/order/data/product',
    async (data) => {
        try {
            const response = await apiAllProductsByCategoryId(data)
            return response
        } catch (error) {
            return error?.response || error.toString()
        }
    }
)


export const getAllShopOfPlaceOrder = createAsyncThunk(
    'new/order/data/shop',
    async (data) => {
        try {
            const response = await apiAllShopOfPlaceOrder(data)
            return response
        } catch (error) {
            return error?.response || error.toString()
        }
    }
)
export const adminPlaceOrder = createAsyncThunk(
    'new/order/data/place',
    async (data) => {
        try {
            const response = await apiPlaceOrder(data)
            return response
        } catch (error) {
            return error?.response || error.toString()
        }
    }
)

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

const dataSlice = createSlice({
    name: 'new/order/data',
    initialState: {
        loading: false,
        orderDetails: {},
        shopList: [],
        CostumerList: [],
        categoryList: [],
        productList: [],
        shopDetails: {}
    },

    reducers: {
        setSelectedShopDetails: (state, action) => {
            const data = state.shopList.filter((shop) => shop.id === action.payload)
            if (data.length > 0) {
                state.shopDetails = data[0]
            } else {
                state.shopDetails = {}
            }
        }
    },
    extraReducers: {
        [getAllCustomer.fulfilled]: (state, action) => {
            state.loading = false
            state.CostumerList = action.payload?.data?.data || []
            console.log( state.CostumerList)
        },
        [getAllCustomer.pending]: (state) => {
            state.loading = true
        },
        [getAllCustomer.rejected]: (state) => {
            state.loading = false
            state.CostumerList = []
        } ,
        [getAllShopOfPlaceOrder.fulfilled]: (state, action) => {
            state.loading = false
            state.shopList = action.payload?.data?.data || []
        },

        [getAllShopOfPlaceOrder.pending]: (state) => {
            state.loading = true
        },

        [getAllCategoryList.fulfilled]: (state, action) => {
            state.categoryList = action.payload?.data?.data || []
        },
        [getAllProductsByCategoryId.fulfilled]: (state, action) => {
            state.productList = action.payload?.data?.data || []
        },
        [adminPlaceOrder.fulfilled]: (state, action) => { },
    },
})

export const { setSelectedShopDetails } =
    dataSlice.actions

export default dataSlice.reducer
