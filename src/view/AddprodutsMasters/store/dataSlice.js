import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiCreateProductMaster } from '../../../services/ProductMasterService'

export const getAdminCreateProductMaster = createAsyncThunk(
    'shop/owner/data/add',
    async (data) => {
        try {
            const response = await apiCreateProductMaster(data)
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


const dataSlice = createSlice({
    name: 'shop/owner/data',
    initialState: {
        loading: false
    },
    reducers: {

    },
    extraReducers: {
        [getAdminCreateProductMaster.fulfilled]: (state, action) => { },
        [uploadImage.fulfilled]: (state, action) => { },
    },
})

// export const { } = dataSlice.actions

export default dataSlice.reducer
