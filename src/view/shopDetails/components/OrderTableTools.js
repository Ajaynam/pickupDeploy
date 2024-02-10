import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import cloneDeep from 'lodash/cloneDeep'
import { getOrdersByShopId, setOrderFilterData, setOrderTableData } from '../store/dataSlice'
import { Button } from '../../../components/ui'
import OrderTableFilter from './OrderTableFilter'

const OrderTableTools = () => {
    const dispatch = useDispatch()
    const tableData = useSelector((state) => state.adminShopDetails.data.orderTableData)

    const fetchData = (data) => {
        dispatch(setOrderTableData(data))
        dispatch(getOrdersByShopId(data))
    }

    const onClearAll = () => {
        const newTableData = cloneDeep(tableData)
        dispatch(setOrderFilterData({ status: '' }))
        fetchData(newTableData)
    }

    return (
        <div className="md:flex items-center justify-end gap-4">
            <div className="md:flex items-center gap-4">
                <OrderTableFilter />
            </div>
            <div className="mb-4">
                <Button size="sm" onClick={onClearAll}>
                    Clear All
                </Button>
            </div>
        </div>
    )
}

export default OrderTableTools
