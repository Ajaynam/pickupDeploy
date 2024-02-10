import { combineReducers } from '@reduxjs/toolkit'
import data from './dataSlice'

const adminAddOwnerReducer = combineReducers({
    data,
})

export default adminAddOwnerReducer
