import { combineReducers } from '@reduxjs/toolkit'
import data from './dataSlice'

const adminOrderListReducer = combineReducers({
    data,
})

export default adminOrderListReducer
