import { combineReducers } from '@reduxjs/toolkit'
import data from './dataSlice'
import state from './stateSlice'

const adminCategoryReducer = combineReducers({
    data,
    state,
})

export default adminCategoryReducer
