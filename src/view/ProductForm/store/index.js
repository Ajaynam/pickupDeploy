import { combineReducers } from '@reduxjs/toolkit'
import data from './dataSlice'

const productFormReducer = combineReducers({
    data
})

export default productFormReducer
