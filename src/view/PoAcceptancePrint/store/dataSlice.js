import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getPoAcceptance = createAsyncThunk(
    'PoAcceptance/data/get',
    async (data) => {
        try {
            const response = await (data)
            return response
        } catch (error) {
            return error?.response || error.toString()
        }
    }
)

const dataSlice = createSlice({
    name: 'adminInvoice/data',
    initialState: {
        loading: false,
        invoice: {}
    },

    reducers: {

    },
    extraReducers: {
        [getPoAcceptance.fulfilled]: (state, action) => {
            state.loading = false
            console.log(action);
            state.invoice = action.payload?.data?.data
        },
        [getPoAcceptance.rejected]: (state, action) => {
            console.log(action);
            state.loading = false
        },

        [getPoAcceptance.pending]: (state) => {
            state.loading = true
        },

    },
})

// export const { } =
//     dataSlice.actions

export default dataSlice.reducer
