import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import cloneDeep from 'lodash/cloneDeep'
import { getAllLedgerByEmployeeId, setFilterData, setTableData } from '../store/dataSlice'
import { Button } from '../../../components/ui'
import LedgerTableFilter from './LedgerTableFilter'

const LedgerTableTools = () => {
    const dispatch = useDispatch()

    const tableData = useSelector((state) => state.adminOwnerDetails.data.tableData)

    // const handleInputChange = (val) => {
    //     const newTableData = cloneDeep(tableData)
    //     newTableData.query = val
    //     newTableData.pageIndex = 1
    //     if (typeof val === 'string' && val.length > 1) {
    //         fetchData(newTableData)
    //     }

    //     if (typeof val === 'string' && val.length === 0) {
    //         fetchData(newTableData)
    //     }
    // }

    const fetchData = (data) => {
        dispatch(setTableData(data))
        dispatch(getAllLedgerByEmployeeId(data))
    }

    const onClearAll = () => {
        const newTableData = cloneDeep(tableData)
        newTableData.query = ''
        // inputRef.current.value = ''
        dispatch(setFilterData({ status: '' }))
        fetchData(newTableData)
    }

    return (
        <div className="md:flex items-center justify-between gap-2">
            <div className='mb-4'>
                <h4>Ledger List</h4>
            </div>
            <div className="md:flex items-center justify-between gap-2">
                <div>
                    <LedgerTableFilter />
                </div>
                <div className="mb-4 mt-1">
                    <Button size="sm" onClick={onClearAll}>
                        Clear All
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default LedgerTableTools
