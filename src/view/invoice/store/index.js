import { combineReducers } from '@reduxjs/toolkit'
import data from './dataSlice'

const adminInvoiceReducer = combineReducers({
    data,
})

export default adminInvoiceReducer
