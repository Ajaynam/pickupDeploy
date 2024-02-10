import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiCreateNewSupplier } from '../../../services/SupplierService'

// export const getAdminCreateNewSupplier = createAsyncThunk(
//     'supplier/data/add',
//     async (data) => {
//         try {
//             const response = await apiCreateNewSupplier(data)
//             return response
//         } catch (error) {
//             return error?.response || error.toString()
//         }
//     }
// )




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
        // [getAdminCreateNewSupplier.fulfilled]: (state, action) => { },
        [uploadImage.fulfilled]: (state, action) => { },
    },
})

// export const { } = dataSlice.actions

export default dataSlice.reducer
