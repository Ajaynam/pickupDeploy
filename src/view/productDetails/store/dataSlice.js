import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiProductsDetailsByProductId, apiUpdateProductsDetailsByProductId } from '../../../services/ProductService'

export const getProductsDetailsByProductId = createAsyncThunk(
    'product/details/data/details',
    async (data) => {
        try {
            const response = await apiProductsDetailsByProductId(data)
            return response
        } catch (error) {
            return error?.response || error.toString()
        }
    }
)
export const putProductsDetailsByProductId = createAsyncThunk(
    'product/details/data/update/details',
    async (data) => {
        console.log(data);
        try {
            const response = await apiUpdateProductsDetailsByProductId(data)
            return response
        } catch (error) {
            return error?.response || error.toString()
        }
    }
)



const dataSlice = createSlice({
    name: 'product/details/data',
    initialState: {
        loading: false,
        productDetails: {}
    },
    reducers: {},
    extraReducers: {
        [getProductsDetailsByProductId.fulfilled]: (state, action) => {
            state.productDetails = action.payload?.data?.data
            state.loading = false
        },
        [getProductsDetailsByProductId.pending]: (state) => {
            state.loading = true
        },
        [getProductsDetailsByProductId.rejected]: (state) => {
            state.loading = false
        },
        [putProductsDetailsByProductId.fulfilled]: (state) => { },
        [putProductsDetailsByProductId.rejected]: (state) => { },
    },
})

// export const {  } = dataSlice.actions

export default dataSlice.reducer
