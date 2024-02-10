import { combineReducers } from '@reduxjs/toolkit'
import data from './dataSlice'

const adminOwnerDetailReducer = combineReducers({
    data,
})

export default adminOwnerDetailReducer
