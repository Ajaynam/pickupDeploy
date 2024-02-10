import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiAddProductCategory, apiAllCategoryList } from '../../../services/CategoryService'
import { apiAddProduct } from '../../../services/ProductService'

export const getAllCategoryList = createAsyncThunk(
    'new/product/data/category',
    async (data) => {
        try {
            const response = await apiAllCategoryList(data)
           
            return response
        } catch (error) {
            console.error(error)
            return error?.response || error.toString()
        }
    }
)
export const addProduct = createAsyncThunk(
    'new/product/data/add',
    async (data) => {
        try {
            const response = await apiAddProduct(data)
  
            return response
        } catch (error) {
           
            return error?.response || error.toString()
        }
    }

)

export const AddProductCategories = createAsyncThunk(
    'new/product/data/add/category',
    async (data) => {
        try {
            const response = await apiAddProductCategory(data)
      
            return response
        } catch (error) {
            console.error(error)
            return error?.response || error.toString()
        }
    }

)


const dataSlice = createSlice({
    name: 'new/product/data',
    initialState: {
        loading: false,
        categoryList: []
    },

    // reducers: {
    //     setSelectedShopDetails: (state, action) => {
    //         const data = state.shopList.filter((shop) => shop.id === action.payload)
    //         if (data.length > 0) {
    //             state.shopDetails = data[0]
    //         } else {
    //             state.shopDetails = {}
    //         }
    //     }
    // },
    extraReducers: {
        [getAllCategoryList.fulfilled]: (state, action) => {
            state.categoryList = action.payload?.data?.data || []
        },
    },
})

export const { setSelectedShopDetails } =
    dataSlice.actions

export default dataSlice.reducer
