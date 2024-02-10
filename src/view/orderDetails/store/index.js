import { combineReducers } from '@reduxjs/toolkit'
import data from './dataSlice'

const adminOrderDetailsReducer = combineReducers({
    data
})

export default adminOrderDetailsReducer
