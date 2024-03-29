import { combineReducers } from '@reduxjs/toolkit'
import data from './dataSlice'
import state from './stateSlice'

const shopListReducer = combineReducers({
    data,
    state
})

export default shopListReducer
