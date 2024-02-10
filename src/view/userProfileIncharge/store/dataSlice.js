
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiAddTrackingNo, apiAllProductMasterList } from '../../../services/SupplierService';

export const getUserInformation = createAsyncThunk(
  'userInformation/get',
  async (id) => {
    try {
      const response = await apiAllProductMasterList(id);
      console.log(response.data)
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);




export const AddTrackingId = createAsyncThunk(
  'tracking/data/add',
  async ({ userId, trackingNo }) => {
    try {
      const response = await apiAddTrackingNo(userId, trackingNo);
      console.log(response);
      return response;
    } catch (error) {
      return error?.response || error.toString();
    }
  }
);

const userInformationSlice = createSlice({
  name: 'userInformation',
  initialState: {
    loading: false,
    user: null,
  },
  reducers: {
   
  },
  extraReducers: {
    [getUserInformation.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload.data;

      console.log(state.user)
    },
    [getUserInformation.pending]: (state) => {
      state.loading = true;
    },
    [getUserInformation.rejected]: (state) => {
      state.loading = false;
    },

    [AddTrackingId.fulfilled]: (state, action) => { },
  },
});

export default userInformationSlice.reducer;
