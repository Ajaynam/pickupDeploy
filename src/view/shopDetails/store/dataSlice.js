import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiShopDetailsByShopId } from '../../../services/ShopService';
import { apiAllLedgerListByShopId, apiPayLedgerAmountByShopId } from '../../../services/LedgerService';
import { apiAllOrderByShopId } from '../../../services/OrderService';


export const getAllLedgerListByShopId = createAsyncThunk(
    'shopDetail/data/ledger/get',
    async (data) => {
        try {
            const response = await apiAllLedgerListByShopId(data)
            return response
        } catch (error) {
            return error?.response || error.toString();
        }
    }
)


export const getOrdersByShopId = createAsyncThunk(
    'shopDetail/data/order/get',
    async (data) => {
        try {
            const response = await apiAllOrderByShopId(data)
            return response
        } catch (error) {
            return error?.response || error.toString();
        }
    }
)


export const getShopDetailsByShopId = createAsyncThunk(
    'shopDetail/data/details/get',
    async (data) => {
        try {
            const response = await apiShopDetailsByShopId(data)
            return response
        } catch (error) {
            return error?.response || error.toString();
        }
    }
)

export const postPayLedgerAmountByShopId = createAsyncThunk(
    'shopDetail/data/details/ledger/debit',
    async (data) => {
        try {
            const response = await apiPayLedgerAmountByShopId(data)
            return response
        } catch (error) {
            return error?.response || error.toString();
        }
    }
)


export const initialTableData = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    query: '',
}


export const initialOrderTableData = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    query: '',
}


export const initialOrderFilterData = {
    status: ''
}

export const initialFilterData = {
    status: ''
}

const dataSlice = createSlice({
    name: 'shopDetail/data',
    initialState: {
        loading: false,
        message: '',
        shopLedgerList: [],
        tableData: initialTableData,
        filterData: initialFilterData,


        orderLoading: false,
        shopOrderList: [],
        orderMessage: '',
        orderTableData: initialOrderTableData,
        orderFilterData: initialOrderFilterData,


        shopDetailsLoading: false,
        shopDetails: {},
        shopMessage: '',
        shopPendingAmount: 0
    },
    reducers: {
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setOrderTableData: (state, action) => {
            state.orderTableData = action.payload
        },
        setShopLedgerList: (state, action) => {
            state.shopLedgerList = action.payload
        },
        setShopOrderList: (state, action) => {
            state.shopOrderList = action.payload
        },
        setOrderFilterData: (state, action) => {
            state.orderFilterData = action.payload
        },
        setFilterData: (state, action) => {
            state.filterData = action.payload
        },
    },
    extraReducers: {

        [getAllLedgerListByShopId.fulfilled]: (state, action) => {
            state.loading = false
            state.shopLedgerList = action.payload?.data?.data || []
            state.tableData.total = action.payload?.data?.total
            if (action.meta.arg?.pageIndex === 1) {
                state.shopPendingAmount = action.payload?.data?.data.length > 0 ? -(action.payload?.data?.data[0].balance) : 0
            }
        },
        [getAllLedgerListByShopId.pending]: (state) => {
            state.loading = true
        },
        [getAllLedgerListByShopId.rejected]: (state) => {
            state.loading = false
            state.shopLedgerList = []
            state.tableData.total = 0
        },



        [getOrdersByShopId.fulfilled]: (state, action) => {
            state.orderLoading = false
            state.shopOrderList = action.payload?.data?.data || []
            state.orderTableData.total = action.payload?.data?.total
        },
        [getOrdersByShopId.rejected]: (state) => {
            state.shopOrderList = []
            state.orderTableData.total = 0
            state.orderLoading = false
        },
        [getOrdersByShopId.pending]: (state) => {
            state.orderLoading = true
        },


        [getShopDetailsByShopId.fulfilled]: (state, action) => {
            state.shopDetailsLoading = false
            state.shopDetails = action.payload?.data?.data || {}
        },
        [getShopDetailsByShopId.pending]: (state) => {
            state.shopDetailsLoading = true
        },
        [getShopDetailsByShopId.rejected]: (state) => {
            state.shopDetails = {}
            state.shopDetailsLoading = true
        },
        [postPayLedgerAmountByShopId.fulfilled]: (state) => { },
    },
})

export const { setTableData, setShopLedgerList, setFilterData, setOrderFilterData, setOrderTableData, setShopOrderList } =
    dataSlice.actions

export default dataSlice.reducer
