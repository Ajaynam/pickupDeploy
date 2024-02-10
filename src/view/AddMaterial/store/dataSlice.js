import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiAllMaterialGradeList, apiDeleteUnits, apiCreateNewMaterialGrade } from '../../../services/MaterialService'

export const creatematerialGrade = createAsyncThunk(
    // 'shop/owner/data/add',
    'materialGrade/data/add',
    async (data) => {
        try {
            const response = await apiCreateNewMaterialGrade(data)
            return response
        } catch (error) {
            return error?.response || error.toString()
        }
    }
)



export const getmaterialGrades = createAsyncThunk(
    'materialGrade/data/get',
    async (data) => {
        try {
            const response = await apiAllMaterialGradeList(data)
            return response
        } catch (error) {
            return error?.response || error.toString()
        }
    }
)

export const deleteUnits = createAsyncThunk(
    'unit/data/delete',
    async (unitsId) => {
        try {
            // Call the delete API function to delete the units
            await apiDeleteUnits(unitsId);
            return unitsId; // Return the deleted units's ID
        } catch (error) {
            throw error;
        }
    }
);


export const initialTableData = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    query: '',
}


export const initialFilterData = {
    status: ''
}

const dataSlice = createSlice({
    name: 'unit/data',
    initialState: {
        loading: false,
        unitsList: [],
        tableData: initialTableData,
        filterData: initialFilterData,
        isEmployeeEditDialogOpen: false,
    },
    reducers: {

        setEmployeeEditDialogVisibility: (state, action) => {
            state.isEmployeeEditDialogOpen = action.payload;
        },

        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setFilterData: (state, action) => {
            state.filterData = action.payload
        },
    },
    extraReducers: {
        [creatematerialGrade.fulfilled]: (state, action) => { },


        [creatematerialGrade.pending]: (state) => {
            state.loading = true;
        },
        [creatematerialGrade.rejected]: (state, action) => {
            state.loading = false;
            // Handle error if needed
        },

        [deleteUnits.fulfilled]: (state, action) => {
            // Remove the deleted units from the state
            state.unitsList = state.unitsList.filter((units) => units.id !== action.payload);
        },

        [getmaterialGrades.fulfilled]: (state, action) => {
            state.loading = false
            state.unitsList = action.payload?.data?.data || []
            state.tableData.total = action.payload?.data?.total || 0
        },
        [getmaterialGrades.pending]: (state) => {
            state.loading = true
        },
        [getmaterialGrades.rejected]: (state, action) => {
            state.loading = false
            state.unitsList = []
            state.tableData.total = 0
        },
    },
})

export const { setTableData, setFilterData, setEmployeeEditDialogVisibility, } =
    dataSlice.actions

export default dataSlice.reducer
