import { combineReducers } from '@reduxjs/toolkit'
import data from './dataSlice'
import state from './stateSlice'

const adminPatternReducer = combineReducers({
    data,
    state,
})

export default adminPatternReducer
