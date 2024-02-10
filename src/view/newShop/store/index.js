import { combineReducers } from '@reduxjs/toolkit'
import data from './dataSlice'

const adminNewShopReducer = combineReducers({
    data,
})

export default adminNewShopReducer
