import { createSlice } from '@reduxjs/toolkit';


const dataSlice = createSlice({
  name: 'poEntry/data',
  initialState: {
    loading: false,
    poEntryData: [], // Initial value for your data as an array
    tableData: [], // Initial value for your table data as an array
  },
  reducers: {
    setPoEntryData: (state, action) => {
      state.poEntryData = action.payload;
    },
    setTableData: (state, action) => {
      state.tableData = action.payload;
    },
  },
});

export const { setPoEntryData, setTableData } = dataSlice.actions;

export default dataSlice.reducer;
