import { combineReducers } from '@reduxjs/toolkit'
import data from './dataSlice'

const shopOwnerListReducer = combineReducers({
    data
})

export default shopOwnerListReducer
