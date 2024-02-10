import { combineReducers } from '@reduxjs/toolkit'
import data from './dataSlice'

const adminAddProductMasterReducer = combineReducers({
    data,
})

export default adminAddProductMasterReducer
