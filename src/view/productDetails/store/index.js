import { combineReducers } from "@reduxjs/toolkit";
import data from './dataSlice'

const ProductDetailsReducer = combineReducers({
    data
})

export default ProductDetailsReducer;