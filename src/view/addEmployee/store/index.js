import { combineReducers } from '@reduxjs/toolkit'
import data from './dataSlice'

const addEmployeeReducer = combineReducers({
    data,
})

export default addEmployeeReducer
