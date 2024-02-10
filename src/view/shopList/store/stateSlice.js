import { createSlice } from '@reduxjs/toolkit'

const stateSlice = createSlice({
    name:  'shop/state',
    initialState: {
        drawerOpen: false,
        selectedShop: {},
    },
    reducers: {
        setSelectedShop: (state, action) => {
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
    setSelectedShop,
    setDrawerOpen,
    setDrawerClose,
} = stateSlice.actions

export default stateSlice.reducer
