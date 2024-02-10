import { combineReducers } from '@reduxjs/toolkit';
import data from './dataSlice';

const adminAdddNewPoEntryReducer = combineReducers({
  data: data,
});

export default adminAdddNewPoEntryReducer;