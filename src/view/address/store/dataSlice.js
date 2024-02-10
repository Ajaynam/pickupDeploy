import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiAllBlockBYDistrictId, apiAllDistrictByStateId, apiAllStates, apiAllVillageByBlockId, apiBlockRegisterByDistrictId, apiDistrictRegisterByStateId, apiStateRegister, apiVillageRegisterByBlockId } from '../../../services/AddressService'

export const getAllState = createAsyncThunk(
    'address/data/state',
    async () => {
        try {
            const response = await apiAllStates()
            return response
        } catch (error) {
            return error?.response || error.toString()
        }
    }
)


export const getAllDistrictByStateId = createAsyncThunk(
    'address/data/district',
    async (data) => {
        try {
            const response = await apiAllDistrictByStateId(data)
            return response
        } catch (error) {
            return error?.response || error.toString()
        }
    }
)
export const getAllBlockByDistrictId = createAsyncThunk(
    'address/data/block',
    async (data) => {
        try {
            const response = await apiAllBlockBYDistrictId(data)
            return response
        } catch (error) {
            return error?.response || error.toString()
        }
    }
)
export const getAllVillageByBlockId = createAsyncThunk(
    'address/data/village',
    async (data) => {
        try {
            const response = await apiAllVillageByBlockId(data)
            return response
        } catch (error) {
            return error?.response || error.toString()
        }
    }
)

//add 

export const addVillage = createAsyncThunk(
    'address/data/village/add',
    async (data) => {
        try {
            const response = await apiVillageRegisterByBlockId(data)
            return response
        } catch (error) {
            return error?.response || error.toString()
        }
    }
)
export const addBlock = createAsyncThunk(
    'address/data/block/add',
    async (data) => {
        try {
            const response = await apiBlockRegisterByDistrictId(data)
            return response
        } catch (error) {
            return error?.response || error.toString()
        }
    }
)
export const addDistrict = createAsyncThunk(
    'address/data/district/add',
    async (data) => {
        try {
            const response = await apiDistrictRegisterByStateId(data)
            return response
        } catch (error) {
            return error?.response || error.toString()
        }
    }
)
export const addState = createAsyncThunk(
    'address/data/village/add',
    async (data) => {

        try {
            const response = await apiStateRegister(data)
            return response
        } catch (error) {
            return error?.response || error.toString()
        }
    }
)


const dataSlice = createSlice({
    name: 'address/data',
    initialState: {
        stateLoading: false,
        stateList: [],
        districtList: [],
        districtLoading: false,
        blockLoading: false,
        blockList: [],
        villageLoading: false,
        villageList: []
    },
    reducers: {
        setOrderList: (state, action) => {
            state.orderList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
    },
    extraReducers: {
        [getAllState.fulfilled]: (state, action) => {
            state.stateList = action.payload?.data?.data
            state.districtList = []
            state.blockList = []
            state.villageList = []
            state.stateLoading = false
        },
        [getAllState.pending]: (state) => {
            state.districtList = []
            state.blockList = []
            state.villageList = []
            state.stateLoading = true
        },
        [getAllState.rejected]: (state) => {
            state.districtList = []
            state.blockList = []
            state.villageList = []
            state.stateLoading = false
        },


        [getAllDistrictByStateId.fulfilled]: (state, action) => {
            state.districtList = action.payload?.data?.data
            state.blockList = []
            state.villageList = []
            state.districtLoading = false
        },
        [getAllDistrictByStateId.pending]: (state) => {
            state.blockList = []
            state.villageList = []
            state.districtLoading = true
        },
        [getAllDistrictByStateId.rejected]: (state) => {
            state.blockList = []
            state.villageList = []
            state.districtLoading = false
        },


        [getAllBlockByDistrictId.fulfilled]: (state, action) => {
   
            state.blockList = action.payload?.data?.data
            state.villageList = []
            state.blockLoading = false
        },
        [getAllBlockByDistrictId.pending]: (state) => {
            state.villageList = []
            state.blockLoading = true
        },
        [getAllBlockByDistrictId.rejected]: (state) => {
            state.villageList = []
            state.blockLoading = false
        },


        [getAllVillageByBlockId.fulfilled]: (state, action) => {
            state.villageList = action.payload?.data?.data
            state.villageLoading = false
        },
        [getAllVillageByBlockId.pending]: (state) => {
            state.villageLoading = true
        },
        [getAllVillageByBlockId.rejected]: (state) => {
            state.villageLoading = false
        },
    },
})

export const { setOrderList, setTableData } = dataSlice.actions

export default dataSlice.reducer
