import { combineReducers } from '@reduxjs/toolkit'
import data from './dataSlice'
import state from './stateSlice'

const adminEmployeeReducer = combineReducers({
    data,
    state,
})

export default adminEmployeeReducer
