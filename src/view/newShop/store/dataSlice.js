import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiAllOwnerCreateShop } from '../../../services/OwnerService'
import { apiAllBlockBYDistrictId, apiAllDistrictByStateId, apiAllStates, apiAllVillageByBlockId } from '../../../services/AddressService'
import { apiNewShopRegister } from '../../../services/ShopService'

export const addShop = createAsyncThunk(
    'shop/add/data/register',
    async (data) => {
        try {
            const response = await apiNewShopRegister(data)
            return response
        } catch (error) {
            return error?.response || error.toString()
        }
    }
)

export const getShopOwner = createAsyncThunk(
    'shop/add/data/owner',
    async (data) => {
        try {
            const response = await apiAllOwnerCreateShop(data)
            return response
        } catch (error) {
            return error?.response || error.toString()
        }
    }
)

export const uploadImage = createAsyncThunk(
    'shop/add/data/image',
    async (data) => {
        try {
            // const response = await apiImageUploadSingle(data)
            const response = ''
            return response
        } catch (error) {
            return error?.response || error.toString()
        }
    }
)


export const getState = createAsyncThunk(
    'shop/add/data/state',
    async (data) => {
        try {
            const response = await apiAllStates(data)
            return response
        } catch (error) {
            return error?.response || error.toString()
        }
    }
)
export const getDistrict = createAsyncThunk(
    'shop/add/data/district',
    async (data) => {
        try {
            const response = await apiAllDistrictByStateId(data)
            return response
        } catch (error) {
            return error?.response || error.toString()
        }
    }
)
export const getBlock = createAsyncThunk(
    'shop/add/data/block',
    async (data) => {
        try {
            const response = await apiAllBlockBYDistrictId(data)
            return response
        } catch (error) {
            return error?.response || error.toString()
        }
    }
)
export const getVillage = createAsyncThunk(
    'shop/add/data/village',
    async (data) => {
        try {
            const response = await apiAllVillageByBlockId(data)
            return response
        } catch (error) {
            return error?.response || error.toString()
        }
    }
)


const dataSlice = createSlice({
    name: 'shop/add/data',
    initialState: {
        state: [],
        district: [],
        block: [],
        village: [],
        image: {},
        owner: []
    },
    reducers: {

    },
    extraReducers: {
        [addShop.fulfilled]: (state, action) => {
            state.formData = action.payload.formData
            state.stepStatus = action.payload.formStatus
        },
        [uploadImage.fulfilled]: (state, action) => {
            state.image = action.payload?.data?.data
        },

        [getState.fulfilled]: (state, action) => {
            state.state = action.payload?.data?.data || []
        },
        [getDistrict.fulfilled]: (state, action) => {
            state.district = action.payload?.data?.data || []
        },
        [getBlock.fulfilled]: (state, action) => {
            state.block = action.payload?.data?.data || []
        },
        [getVillage.fulfilled]: (state, action) => {
            state.village = action.payload?.data?.data || []
        },
        [getShopOwner.fulfilled]: (state, action) => {
            state.owner = action.payload?.data?.data || []
        },
    },
})

// export const { } = dataSlice.actions

export default dataSlice.reducer
