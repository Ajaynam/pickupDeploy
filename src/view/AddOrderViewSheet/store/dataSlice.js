import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiCreateNewOwner } from '../../../services/OwnerService'

export const getAdminCreateNewOwner = createAsyncThunk(
    'shop/owner/data/add',
    async (data) => {
        try {
            const response = await apiCreateNewOwner(data)
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
        [getAdminCreateNewOwner.fulfilled]: (state, action) => { },
        [uploadImage.fulfilled]: (state, action) => { },
    },
})

// export const { } = dataSlice.actions

export default dataSlice.reducer
