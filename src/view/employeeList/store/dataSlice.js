import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiAllEmployeeList } from '../../../services/EmployeeService'


export const getEmployee = createAsyncThunk(
    'employee/data/get',
    async (data) => {
        try {
            const response = await apiAllEmployeeList(data)
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


export const initialFilterData = {
    status: ''
}

const dataSlice = createSlice({
    name: 'employee/data',
    initialState: {
        loading: false,
        employeeList: [],
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
        [getEmployee.fulfilled]: (state, action) => {
            state.loading = false
            state.employeeList = action.payload?.data?.data || []
            state.tableData.total = action.payload?.data?.total || 0
        },
        [getEmployee.pending]: (state) => {
            state.loading = true
        },
        [getEmployee.rejected]: (state, action) => {
            state.loading = false
            state.employeeList = []
            state.tableData.total = 0
        },
    },
})

export const { setTableData, setFilterData } =
    dataSlice.actions

export default dataSlice.reducer
