import { combineReducers } from '@reduxjs/toolkit'
import state from './stateSlice'
import data from './dataSlice'

const adminNewOrderReducer = combineReducers({
    data,
    state,
})

export default adminNewOrderReducer
