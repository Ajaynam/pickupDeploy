import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiAddTrackingNo, apiAllProductMasterList } from '../../../services/SupplierService'

export const getPoAcceptance = createAsyncThunk(
    'PoAcceptance/data/get',
    async (data) => {
        try {
            const response = await (data)
            return response
        } catch (error) {
            return error?.response || error.toString()
        }
    }
)

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

const dataSlice = createSlice({
    name: 'adminInvoice/data',
    initialState: {
        loading: false,
        invoice: {}
    },

    reducers: {

    },
    extraReducers: {
        [getPoAcceptance.fulfilled]: (state, action) => {
            state.loading = false
            console.log(action);
            state.invoice = action.payload?.data?.data
        },
        [getPoAcceptance.rejected]: (state, action) => {
            console.log(action);
            state.loading = false
        },

        [getPoAcceptance.pending]: (state) => {
            state.loading = true
        },




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
})

// export const { } =
//     dataSlice.actions

export default dataSlice.reducer







