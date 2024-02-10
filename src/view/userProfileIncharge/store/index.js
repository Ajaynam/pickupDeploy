import { combineReducers } from '@reduxjs/toolkit'
import data from './dataSlice'

const adminUserReducer = combineReducers({
    data,
})

export default adminUserReducer