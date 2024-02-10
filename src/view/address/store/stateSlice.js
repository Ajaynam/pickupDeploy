import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    districtId: null,
    stateId: null,
    blockId: null,
    villageId: null
};

const addressIdSlice = createSlice({
    name: 'addressId',
    initialState,
    reducers: {
        setDistrictId(state, action) {
            state.districtId = action.payload;
        },
        setStateId(state, action) {
            state.stateId = action.payload;
        },
        setVillageId(state, action) {
            state.villageId = action.payload;
        },
        setBlockId(state, action) {
            state.blockId = action.payload;
        },
    },
});

export const { setVillageId, setBlockId, setDistrictId, setStateId } = addressIdSlice.actions;
export default addressIdSlice.reducer;
