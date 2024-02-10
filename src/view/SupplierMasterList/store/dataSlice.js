import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiAllSupplierList, apiDeleteSalesOrders } from '../../../services/SupplierService';


export const getAllSupplier = createAsyncThunk(
    'supplier/data/get',
    async (data) => {
        try {
            const response = await apiAllSupplierList(data)
            console.log(response.data)
            return response
        } catch (error) {
            return error?.response;
        }
    }
)

export const deleteOrders = createAsyncThunk (
'order/data/delete',

    async (data) => {
        try {
            const response = await apiDeleteSalesOrders(data)
            console.log(response)
            return response.data
        }
        catch (error) {
            throw error;
        }
    }
)


// export const deleteOrders = createAsyncThunk(
//     'order/data/delete',
//     async (data) => {
//       try {
//         await apiDeleteSalesOrders(data);
//         return data; 
//       } catch (error) {
//         throw error;
//       }
//     }
//   );

export const initialTableData = {
    total: 0,
    pageIndex: 1,
    pageSize: 25,
    query: '',
}


export const initialFilterData = {
    status: ''
}

const dataSlice = createSlice({
    name: 'shopOwner/data',
    initialState: {
        loading: false,
        message: '',
        shopOwnerList: [],
        tableData: initialTableData,
        filterData: initialFilterData,
    },
    reducers: {
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setFilterData: (state, action) => {
            state.filterData = action.payload
        },
    },
    extraReducers: {

        [deleteOrders.fulfilled]: (state, action) => {
            state.shopOwnerList = state.shopOwnerList.filter((order) => order.id !== action.payload);
        },

        [getAllSupplier.fulfilled]: (state, action) => {
            state.loading = false
            state.shopOwnerList = action.payload?.data?.data || []
            state.tableData.total = action.payload?.data?.total 
        },
        [getAllSupplier.pending]: (state) => {
            state.loading = true
        },
        [getAllSupplier.rejected]: (state) => {
            state.loading = false
            state.shopOwnerList = []
            state.tableData.total = 0
        }
    },
})

export const { setTableData, setFilterData } =
    dataSlice.actions

export default dataSlice.reducer
