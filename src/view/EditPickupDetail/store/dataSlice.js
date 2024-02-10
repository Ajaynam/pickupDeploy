// // dataSlice.js

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// import { apiAllProductMasterList, apiEditOrder } from '../../../services/SupplierService';


// export const getSingleOrder = createAsyncThunk(
//     'userInformation/get',
//     async (id) => {
//       try {
//         const response = await apiAllProductMasterList(id);
//         console.log(response.data)
//         return response.data;
//       } catch (error) {
//         throw error;
//       }
//     }
//   );



// export const updateOrder = createAsyncThunk('data/editOrder', async ({ id, updatedOrderData }) => {
//     try {
//         const response = await apiEditOrder(id, updatedOrderData);

//         console.log( "upadte" ,response.data)
//         return response.data; 

//     } catch (error) {
//         throw Error('Failed to edit order');
//     }
// });

// // Create a slice with initial state and reducers
// const dataSlice = createSlice({
//     name: 'data',
//     initialState: {
//         // singleOrder: null,
//         // user: {},
//         loading: false,
//         // Other state properties...
//     },
//     reducers: {
//         // Other synchronous reducers...
//     },
//     extraReducers: {

//         [getSingleOrder.fulfilled]: (state, action) => {
//             state.loading = false;
//             state.user = action.payload.data;
      
//             console.log(state.user)
//           },
//           [getSingleOrder.pending]: (state) => {
//             state.loading = true;
//           },
//           [getSingleOrder.rejected]: (state) => {
//             state.loading = false;
//           },

//           [updateOrder.fulfilled]: (state, action) => { },
       

        
//     },
// });

// // Export actions and reducer
// export const { /* Other sync actions... */ } = dataSlice.actions;
// export default dataSlice.reducer;


// dataSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { apiAllProductMasterList, apiEditOrder } from '../../../services/SupplierService';

export const getSingleOrder = createAsyncThunk(
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

export const updateOrder = createAsyncThunk('data/editOrder', async ({ id, updatedOrderData }) => {
  try {
    const response = await apiEditOrder(id, updatedOrderData);
    console.log("update", response.data);
    return response.data;
  } catch (error) {
    throw Error('Failed to edit order');
  }
});

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    loading: false,
    user: {}, // Initialize user property
    // Other state properties...
  },
  reducers: {
    // Other synchronous reducers...
  },
  extraReducers: {
    [getSingleOrder.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload.data;
      console.log(state.user);
    },
    [getSingleOrder.pending]: (state) => {
      state.loading = true;
    },
    [getSingleOrder.rejected]: (state) => {
      state.loading = false;
    },
    [updateOrder.fulfilled]: (state, action) => {
      // Update state with the new order data
    //   state.user = action.payload.data;
    },
  },
});

export const { /* Other sync actions... */ } = dataSlice.actions;
export default dataSlice.reducer;
