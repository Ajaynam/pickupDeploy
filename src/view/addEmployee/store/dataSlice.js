import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiEmployeeRegister } from '../../../services/EmployeeService'




export const addEmployee = createAsyncThunk(
    'employee/add/data/add',
    async (data) => {
        try {
            const response = await apiEmployeeRegister(data)
            return response
        } catch (error) {
            return error?.response || error.toString()
        }
    }
)




export const uploadImage = createAsyncThunk(
    'employee/add/data/image',
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
    name: 'employee/add/data',
    initialState: {
        loading: false
    },
    reducers: {

    },
    extraReducers: {
        [addEmployee.fulfilled]: (state, action) => { },
        [uploadImage.fulfilled]: (state, action) => { },
    },
})

// export const { } = dataSlice.actions

export default dataSlice.reducer
