import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiCreateProductMaster, apiImageUploadSingle } from '../../../services/ProductMasterService'
import { apiAllPetternList, apiDeleteUnits, apiCreateNewPattern } from '../../../services/PatternService'
import { apiAllMaterialGradeList } from '../../../services/MaterialService'
import { apiAllCategoryList } from '../../../services/ProductCategoryService'

export const getAdminCreateProductMaster = createAsyncThunk(
    'shop/owner/data/add',
    async (data) => {
        try {
            const response = await apiCreateProductMaster(data)
            console.log(response)

            return response
        } catch (error) {
            return error?.response || error.toString()
        }
    }
)




export const uploadImage = createAsyncThunk(
    'shop/owner/data/image',
    async (data) => {
        try {
            const response = await apiImageUploadSingle(data)
            // const response = ''
            console.log(response)
            return response
        } catch (error) {
            return error?.response || error.toString()
        }
    }
)






export const getPatterns = createAsyncThunk(
    'pattern/data/get',
    async (data) => {
        try {
            const response = await apiAllPetternList(data)
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

export const getCategorys = createAsyncThunk(
    'category/data/get',
    async (data) => {
        try {
            const response = await apiAllCategoryList(data)
            return response
        } catch (error) {
            return error?.response || error.toString()
        }
    }
)





const dataSlice = createSlice({
    name: 'shop/owner/data',
    initialState: {
        loading: false,
        patternList: [],
        categoryList: [],
        materialList: [],
    },
    reducers: {

    },
    extraReducers: {
        [getAdminCreateProductMaster.fulfilled]: (state, action) => { },
        [uploadImage.fulfilled]: (state, action) => { },

        [getPatterns.fulfilled]: (state, action) => {
            state.loading = false
            state.patternList = action.payload?.data?.data || []
        },
        [getPatterns.pending]: (state) => {
            state.loading = true
        },
        [getPatterns.rejected]: (state, action) => {
            state.loading = false
            state.patternList = []
        },
        [getCategorys.fulfilled]: (state, action) => {
            state.loading = false
            state.categoryList = action.payload?.data?.data  || []
        },
        [getCategorys.pending]: (state) => {
            state.loading = true
        },
        [getCategorys.rejected]: (state, action) => {
            state.loading = false
            state.categoryList = []
        },
        [getmaterialGrades.fulfilled]: (state, action) => {
            state.loading = false
            state.materialList = action.payload?.data?.data || []
        },
        [getmaterialGrades.pending]: (state) => {
            state.loading = true
        },
        [getmaterialGrades.rejected]: (state, action) => {
            state.loading = false
            state.materialList = []
        },
    },
})

// export const { } = dataSlice.actions

export default dataSlice.reducer
