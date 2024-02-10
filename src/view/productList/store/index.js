import { combineReducers } from '@reduxjs/toolkit'
import data from './dataSlice'

const productListReducer = combineReducers({
    data,
})

export default productListReducer
