import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { apiAllProductMasterList, apigetImage } from '../../../services/ProductMasterService'



export const getAllProduct = createAsyncThunk(
    'PoProduct/data/get',
    async (data) => {
        try {
            const response = await apiAllProductMasterList({
                pageIndex: 1, 
                pageSize: 100, 
                ...data,
            });
            console.log(response);
            return response;
        } catch (error) {
            return error?.response;
        }
    }
);
// export const getImage = createAsyncThunk(
//     'PoProduct/image/get',
//     async (filename, { rejectWithValue }) => {
//       try {
//         const response = await apigetImage({ filename });
//         console.log(response);
//         return response.data;  // Assuming the image data is in the response data field
//       } catch (error) {
//         return rejectWithValue(error?.response);
//       }
//     }
//   );



export const getImage = createAsyncThunk(
    'PoProduct/image/get',
    async (filename, { rejectWithValue }) => {
      try {
        const response = await apigetImage({ filename });
        console.log(response);
        return response.data;  
      } catch (error) {
        return rejectWithValue(error?.response);
      }
    }
  );


// export const initialTableData = {
//     total: 0,
//     pageIndex: 1,
//     pageSize: 10,
//     query: '',
// }
// export const initialShopTableData = {
//     total: 0,
//     pageIndex: 1,
//     pageSize: 10,
//     query: '',
// }


export const initialFilterData = {
    status: "",
    id: ""
}
export const initialShopFilterData = {
    status: ''
}

const dataSlice = createSlice({
    name: 'employee/details/data',
    initialState: {
        loading: false,
        profileLoading: false,
        owner: {},
        employeeVillageShop: [],
        villageList: [],
        shopList: [],
        shopOwnerList: [], shopOwner: {}, product_id: "",
        villageLoading: false,
        ledgerList: [],
        // tableData: initialTableData,
        filterData: initialFilterData,
        // shopTableData: initialShopTableData,
        shopFilterData: initialShopFilterData,
        imageData: null,
    },
    reducers: {
        // setTableData: (state, action) => {
        //     state.tableData = action.payload
        // },
        setProductId: (state, action) => {
            state.product_id = action.payload
        },
        setFilterData: (state, action) => {
            state.filterData = action.payload
        },
        // setShopTableData: (state, action) => {
        //     state.shopTableData = action.payload
        // },
        setShopFilterData: (state, action) => {
            state.shopFilterData = action.payload
        },
    },
    extraReducers: {

        [getAllProduct.fulfilled]: (state, action) => {
            state.loading = false;
            state.shopOwnerList = action.payload?.data?.data || [];
            // state.shopOwner = action.payload?.data?.data.find(f => f.product_id === +state.product_id);

            console.log("find", state.shopOwner)
        },
        [getAllProduct.pending]: (state) => {
            state.loading = true
        },
        [getAllProduct.rejected]: (state) => {
            state.loading = false
            state.shopOwnerList = []
        } ,
        [getImage.fulfilled]: (state, action) => {
            state.imageData = action.payload;
            console.log( "ihhh" ,state.imageData )
          },



    },
})

export const { setFilterData, setProductId, setShopFilterData } =
    dataSlice.actions

export default dataSlice.reducer
