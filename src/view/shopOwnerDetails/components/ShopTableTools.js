import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import cloneDeep from 'lodash/cloneDeep'
import ShopTableSearch from './ShopTableSearch'
import { getAllShopByEmployeeId, setShopFilterData, setShopTableData } from '../store/dataSlice'
import { Button } from '../../../components/ui'

const ShopTableTools = () => {
    const dispatch = useDispatch()

    const inputRef = useRef()

    const tableData = useSelector((state) => state.adminOwnerDetails.data.shopTableData)

    const handleInputChange = (val) => {
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
        dispatch(setShopTableData(data))
        dispatch(getAllShopByEmployeeId(data))
    }

    const onClearAll = () => {
        const newTableData = cloneDeep(tableData)
        newTableData.query = ''
        inputRef.current.value = ''
        dispatch(setShopFilterData({ status: '' }))
        fetchData(newTableData)
    }

    return (
        <div className="md:flex items-center justify-between gap-2">
            <div className='mb-4'>
                <h4>Shop List</h4>
            </div>
            <div className="md:flex items-center justify-between gap-2">
                <ShopTableSearch
                    ref={inputRef}
                    onInputChange={handleInputChange}
                />
                {/* <CustomerTableFilter /> */}
                <div className="mb-4">
                    <Button size="sm" onClick={onClearAll}>
                        Clear All
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ShopTableTools
