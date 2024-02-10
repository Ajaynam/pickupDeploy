import { createSlice } from '@reduxjs/toolkit'

const stateSlice = createSlice({
    name:  'employee/state',
    initialState: {
        drawerOpen: false,
        selectedEmployee: {},
    },
    reducers: {
        setSelectedProduct: (state, action) => {
            state.selectedProduct = action.payload
        },
        toggleDeleteConfirmation: (state, action) => {
            state.deleteConfirmation = action.payload
        },
        setSelectedEmployee: (state, action) => {
            state.selectedShop = action.payload
        },
        setDrawerOpen: (state) => {
            state.drawerOpen = true
        },
        setDrawerClose: (state) => {
            state.drawerOpen = false
        },
    },
})

export const {
    setSelectedProduct,
    toggleDeleteConfirmation,
    setSelectedEmployee,
    setDrawerOpen,
    setDrawerClose,
} = stateSlice.actions

export default stateSlice.reducer
