
import React, { useCallback, useEffect, useMemo } from 'react'
import {  Badge } from '../../../components/ui'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import DataTable from '../../../components/shared/DataTable'
import cloneDeep from 'lodash/cloneDeep';
import {  getOrdersByShopId, setOrderTableData } from '../store/dataSlice'
import useThemeClass from '../../../utils/hooks/useThemeClass';
import useQuery from '../../../utils/hooks/useQuery'
import { NumericFormat } from 'react-number-format'
import dayjs from 'dayjs'


const orderStatusBgColor = {
    confirmed: 'bg-emerald-500',
    pending: 'bg-yellow-500',
    rejected: 'bg-red-400',
}


const statusBgColor = {
    paid: 'bg-emerald-500',
    pending: 'bg-yellow-500',
    rejected: 'bg-red-400',
}


const statusTextColor = {
    paid: 'text-emerald-500',
    pending: 'text-yellow-500',
    rejected: 'text-red-400',
}
const orderStatusTextColor = {
    confirmed: 'text-emerald-500',
    pending: 'text-yellow-500',
    rejected: 'text-red-400',
}


const OrderColumn = ({ row }) => {
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onView = useCallback(() => {
        navigate(`/order/details?id=${row?.orderId}`)
    }, [navigate, row])

    return (
        <span
            className={`cursor-pointer select-none font-semibold hover:${textTheme}`}
            onClick={onView}
        >
            #{row.orderId}
        </span>
    )
}


const OrderTable = () => {
    const dispatch = useDispatch()

    const columns = useMemo(
        () => [
            {
                header: 'Id',
                accessorKey: 'id',
                cell: (props) => {
                    const row = props.row.original
                    return <OrderColumn row={row} />
                }
            },
            {
                header: 'order status',
                accessorKey: 'orderStatus',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                            <Badge
                                className={orderStatusBgColor[row?.orderStatus]}
                            />
                            <span
                                className={`ml-2 rtl:mr-2 capitalize font-semibold ${orderStatusTextColor[row?.orderStatus]}`}
                            >
                                {row?.orderStatus}
                            </span>
                        </div>
                    )
                },
            },
            {
                header: 'bill amount',
                accessorKey: 'billamount',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <NumericFormat
                            displayType="text"
                            value={(
                                Math.round(row?.billamount * 100) / 100
                            ).toFixed(2)}
                            prefix={'₹'}
                            thousandSeparator={true}
                        />
                    )
                }
            },
            {
                header: 'pending amount',
                accessorKey: 'pendingamount',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <NumericFormat
                            displayType="text"
                            value={(
                                Math.round(row?.pendingamount * 100) / 100
                            ).toFixed(2)}
                            prefix={'₹'}
                            thousandSeparator={true}
                        />
                    )
                },
            },
            {
                header: 'Bill status',
                accessorKey: 'billstatus',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                            <Badge
                                className={statusBgColor[row?.billstatus]}
                            />
                            <span
                                className={`ml-2 rtl:mr-2 capitalize font-semibold ${statusTextColor[row?.billstatus]}`}
                            >
                                {row?.billstatus}
                            </span>
                        </div>
                    )
                },
            },
            {
                header: 'Date',
                accessorKey: 'createDate',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                            {dayjs(row?.createDate).format('DD/MM/YYYY')}
                        </div>
                    )
                },
            }
        ],
        []
    )

    const data = useSelector((state) => state.adminShopDetails.data.shopOrderList)
    const loading = useSelector((state) => state.adminShopDetails.data.orderLoading)
    const { status } = useSelector(
        (state) => state.adminShopDetails.data.orderFilterData
    )

    const searchQuery = useQuery()
    const shopId = searchQuery.get('id')

    const { pageIndex, pageSize, query, total } = useSelector(
        (state) => state.adminShopDetails.data.orderTableData
    )


    const fetchData = useCallback(() => {
        dispatch(getOrdersByShopId({ pageIndex, pageSize, query, status, shopId }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex, pageSize, query, status, shopId])




    useEffect(() => {
        if (shopId)
            fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex, pageSize, query, status, shopId])

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, query, total, shopId }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [pageIndex, pageSize, query, status, total, shopId]
    )

    useEffect(() => {
        dispatch(setOrderTableData(tableData))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tableData])

    const onPaginationChange = (page) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex = page
        dispatch(setOrderTableData(newTableData))
    }

    const onSelectChange = (value) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageSize = Number(value)
        newTableData.pageIndex = 1
        dispatch(setOrderTableData(newTableData))
    }

    return (
        <DataTable
            columns={columns}
            data={data}
            skeletonAvatarColumns={[0]}
            skeletonAvatarProps={{ width: 28, height: 28 }}
            loading={loading}
            pagingData={{ pageIndex, pageSize, query, total, status, shopId }}
            onPaginationChange={onPaginationChange}
            onSelectChange={onSelectChange}
        />
    )
}

export default OrderTable

