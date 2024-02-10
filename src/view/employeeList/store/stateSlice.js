import { createSlice } from '@reduxjs/toolkit'

const stateSlice = createSlice({
    name:  'employee/state',
    initialState: {
        drawerOpen: false,
        selectedEmployee: {},
    },
    reducers: {
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
    setSelectedEmployee,
    setDrawerOpen,
    setDrawerClose,
} = stateSlice.actions

export default stateSlice.reducer
