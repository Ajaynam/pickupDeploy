import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiAllCategoryList } from '../../../services/CategoryService'
import { apiAddStockInExistingProduct, apiDeleteProductImageByProductIdAndImageId } from '../../../services/ProductService'



export const getAllCategoryList = createAsyncThunk(
    'edit/product/data/category',
    async (data) => {
        try {
            const response = await apiAllCategoryList(data)

            return response
        } catch (error) {
            return error?.response || error.toString()
        }
    }
)


export const deleteDeleteProductImageByProductIdAndImageId = createAsyncThunk(
    'edit/product/data/delete/product-image',
    async (data) => {
        try {
            const response = await apiDeleteProductImageByProductIdAndImageId(data)
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


const dataSlice = createSlice({
    name: 'edit/product/data',
    initialState: {
        loading: false,
        categoryList: []
    },

    extraReducers: {
        [getAllCategoryList.fulfilled]: (state, action) => {
            state.categoryList = action.payload?.data?.data || []
        },
        [deleteDeleteProductImageByProductIdAndImageId.fulfilled]: (state,) => { },
        [deleteDeleteProductImageByProductIdAndImageId.rejected]: (state,) => { },
    },
})

export const { setSelectedShopDetails } =
    dataSlice.actions

export default dataSlice.reducer
