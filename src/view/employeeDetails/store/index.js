import { combineReducers } from '@reduxjs/toolkit'
import data from './dataSlice'

const adminEmployeeDetailReducer = combineReducers({
    data,
})

export default adminEmployeeDetailReducer
