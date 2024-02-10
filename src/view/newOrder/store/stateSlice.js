import { createSlice } from '@reduxjs/toolkit'


export const initialState = {
    selectedProduct: [],
    selectedProductNameList: [],
    selectedQuantity: [],
    selectedPrice: [],
    selectedCategory: [],
    sGST: 0,
    cGST: 0
}
const stateSlice = createSlice({
    name: 'admin/new/order/state',
    initialState,
    reducers: {
        setSelectedProduct: (state, action) => {
   
            state.selectedProduct.push(action.payload.product?.id)
            state.selectedProductNameList.push(action.payload.product)
            state.selectedQuantity.push(action.payload.quantity)
            state.selectedPrice.push(action.payload.product?.price)
            state.selectedCategory.push(action.payload.category?.name)
        },
        setRemoveSelectedProducts: (state, action) => {
            state.selectedProduct = state.selectedProduct.filter((item, index) => index != action.payload)
            state.selectedProductNameList = state.selectedProductNameList.filter((item, index) => index != action.payload)
            state.selectedQuantity = state.selectedQuantity.filter((item, index) => index != action.payload)
            state.selectedPrice = state.selectedPrice.filter((item, index) => index != action.payload)
            state.selectedCategory = state.selectedCategory.filter((item, index) => index != action.payload)
        },
        setGST: (state, action) => {
            state.cGST = action.payload.cGST
            state.sGST = action.payload.sGST
        },
        setInitialState: (state) => {
            state.selectedProduct = []
            state.selectedProductNameList = []
            state.selectedQuantity = []
            state.selectedPrice = []
            state.selectedCategory = []
            state.sGST = 0
            state.cGST = 0
        }
    },
})

export const {
    setSelectedProduct,
    setRemoveSelectedProducts,
    setGST,
    setInitialState
} = stateSlice.actions

export default stateSlice.reducer
