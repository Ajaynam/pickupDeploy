import React, {  useRef } from 'react'
import { HiOutlineSearch } from 'react-icons/hi'
import debounce from 'lodash/debounce'
import { useDispatch, useSelector } from 'react-redux'

import { Input } from '../../../components/ui'
import cloneDeep from 'lodash/cloneDeep'
import { getAllSupplier, setTableData } from '../store/dataSlice'

const ShopOwnerTableSearch = () => {

    const dispatch = useDispatch()

    const searchInput = useRef()

    const tableData = useSelector(
        (state) => state.adminShopOwnerList1.data.tableData
    )

    // const { onInputChange } = props

    const debounceFn = debounce(handleDebounceFn, 500)

    // function handleDebounceFn(val) {
    //     onInputChange?.(val)
    // }

    
    function handleDebounceFn(val) {
        const newTableData = cloneDeep(tableData)
        newTableData.query = val
        newTableData.pageIndex = 1
        if (typeof val === 'string' && val.length > 1) {
            fetchData(newTableData)
        }

        if (typeof val === 'string' && val.length === 0) {
            fetchData(newTableData)
        }
    }

    const fetchData = (data) => {
        dispatch(setTableData(data))
        dispatch(getAllSupplier(data))
    }

    const onEdit = (e) => {
        debounceFn(e.target.value)
    }

    // const handleInputChange = (e) => {
    //     debounceFn(e.target.value)
    // }

    return (
        <Input
            ref={searchInput}
            className="max-w-md md:w-52 mb-4"
            size="sm"
            placeholder="Search"
            prefix={<HiOutlineSearch className="text-lg" />}
            onChange={onEdit}
        />
    )
}

export default ShopOwnerTableSearch
