import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiAllShopByEmployeeId } from '../../../services/ShopService'
import { apiPayLedgerByEmployeeId } from '../../../services/LedgerService'
import { apiAllVillagesByEmployeeId, apiUpdateVillagesAccessByEmployeeId } from '../../../services/AddressService'
import { apiEmployeeDetailsByEmployeeId } from '../../../services/EmployeeService'

export const getEmployeeDetailsByEmployeeId = createAsyncThunk(
    'employee/details/data/get',
    async (data) => {
        try {
            const response = await apiEmployeeDetailsByEmployeeId(data)
            return response
        } catch (error) {
            return error?.response || error.toString()
        }
    }
)


export const getAllShopByEmployeeId = createAsyncThunk(
    'employee/details/data/shop',
    async (data) => {
        try {
            const response = await apiAllShopByEmployeeId(data)
   
            return response
        } catch (error) {
            return error?.response || error.toString()
        }
    }
)

export const getAllLedgerByEmployeeId = createAsyncThunk(
    'employee/details/data/ledger',
    async (data) => {
        try {
            const response = await apiPayLedgerByEmployeeId(data)
            return response
        } catch (error) {
            return error?.response || error.toString()
        }
    }
)


export const getAllVillageByEmployeeId = createAsyncThunk(
    'employee/details/data/village',
    async (data) => {
        try {
            const response = await apiAllVillagesByEmployeeId(data)
            return response
        } catch (error) {
            return error?.response || error.toString()
        }
    }
)



export const putUpdateVillagesAccessByEmployeeId = createAsyncThunk(
    'employee/details/data/village/update',
    async (data) => {
        try {
            const response = await apiUpdateVillagesAccessByEmployeeId(data)
            return response
        } catch (error) {
            return error?.response || error.toString()
        }
    }
)


export const initialTableData = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    query: '',
}
export const initialShopTableData = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    query: '',
}


export const initialFilterData = {
    status: ''
}
export const initialShopFilterData = {
    status: ''
}

const dataSlice = createSlice({
    name: 'employee/details/data',
    initialState: {
        loading: false,
        profileLoading: false,
        employee: {},
        employeeVillageShop: [],
        villageList: [],
        shopList: [],
        villageLoading: false,
        ledgerList: [],
        tableData: initialTableData,
        filterData: initialFilterData,
        shopTableData: initialShopTableData,
        shopFilterData: initialShopFilterData,
    },
    reducers: {
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        // setEmployeeList: (state, action) => {
        //     state.employeeList = action.payload
        // },
        setFilterData: (state, action) => {
            state.filterData = action.payload
        },
        setShopTableData: (state, action) => {
            state.shopTableData = action.payload
        },
        setShopFilterData: (state, action) => {
            state.shopFilterData = action.payload
        },
    },
    extraReducers: {
        [getEmployeeDetailsByEmployeeId.fulfilled]: (state, action) => {
            state.profileLoading = false
            state.employee = action.payload?.data?.data
        },
        [getEmployeeDetailsByEmployeeId.pending]: (state) => {
            state.profileLoading = true
        },
        [getEmployeeDetailsByEmployeeId.rejected]: (state) => {
            state.profileLoading = false
            state.employee = {}
        },

        [getAllShopByEmployeeId.fulfilled]: (state, action) => {
            state.shopListLoading = false
            state.shopList = action.payload?.data?.data || []
            state.shopTableData.total = action.payload?.data?.total || 0
        },
        [getAllShopByEmployeeId.pending]: (state) => {
            state.shopListLoading = true
        },
        [getAllShopByEmployeeId.rejected]: (state, action) => {
            state.shopListLoading = false
        },

        [getAllLedgerByEmployeeId.pending]: (state) => {
            state.loading = true
        },
        [getAllLedgerByEmployeeId.fulfilled]: (state, action) => {
            state.ledgerList = action.payload?.data?.data
            state.loading = false
        },
        [getAllLedgerByEmployeeId.rejected]: (state, action) => {
            state.loading = false
        },


        [getAllVillageByEmployeeId.pending]: (state) => {
            state.villageLoading = true
        },
        [getAllVillageByEmployeeId.fulfilled]: (state, action) => {
            state.villageList = action.payload?.data?.data
            state.villageLoading = false
        },
        [getAllVillageByEmployeeId.rejected]: (state) => {
            state.villageLoading = false
        },
        [putUpdateVillagesAccessByEmployeeId.fulfilled]: () => { },
        [putUpdateVillagesAccessByEmployeeId.rejected]: () => { },
    },
})

export const { setTableData, setFilterData, setShopTableData, setShopFilterData } =
    dataSlice.actions

export default dataSlice.reducer
