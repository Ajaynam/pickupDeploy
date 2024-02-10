import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import cloneDeep from 'lodash/cloneDeep'
import ShopTableSearch from './ShopTableSearch'
import { getAllShop, setFilterData, setTableData } from '../store/dataSlice'
import { Button } from '../../../components/ui'
import { Link } from 'react-router-dom'
import { HiPlusCircle } from 'react-icons/hi'

const ShopTableTools = () => {
    const dispatch = useDispatch()

    const inputRef = useRef()

    const tableData = useSelector((state) => state.adminShopList.data.tableData)

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
        dispatch(setTableData(data))
        dispatch(getAllShop(data))
    }

    const onClearAll = () => {
        const newTableData = cloneDeep(tableData)
        newTableData.query = ''
        inputRef.current.value = ''
        dispatch(setFilterData({ status: '' }))
        fetchData(newTableData)
    }

    return (
        <div className="md:flex items-center justify-end gap-2">
            <div className="md:flex items-center gap-4">
                <ShopTableSearch
                    ref={inputRef}
                    onInputChange={handleInputChange}
                />
                {/* <CustomerTableFilter /> */}
            </div>
            <div className="mb-4">
                <Button size="sm" onClick={onClearAll}>
                    Clear All
                </Button>
            </div>
            <div className="mb-4 flex">
                <Link
                    className="block lg:inline-block md:mb-0 mb-4"
                    to="/owner/new"
                >
                    <Button block variant="solid" size="sm" icon={<HiPlusCircle />}>
                        Add Owner
                    </Button>
                </Link>
            </div>
            <div className="mb-4 flex">
                <Link
                    className="block lg:inline-block md:mb-0 mb-4"
                    to="/shop/new"
                >
                    <Button block variant="solid" size="sm" icon={<HiPlusCircle />}>
                        Add Shop
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default ShopTableTools
