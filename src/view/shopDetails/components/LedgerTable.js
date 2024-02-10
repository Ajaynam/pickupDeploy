
import React, { useCallback, useEffect, useMemo } from 'react'
import {  Badge } from '../../../components/ui'
import { useDispatch, useSelector } from 'react-redux'
import DataTable from '../../../components/shared/DataTable'
import cloneDeep from 'lodash/cloneDeep';
import { getAllLedgerListByShopId, setTableData } from '../store/dataSlice'
import useQuery from '../../../utils/hooks/useQuery'
import { NumericFormat } from 'react-number-format'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom';
import useThemeClass from '../../../utils/hooks/useThemeClass';


const typeBgColor = {
    credit: 'bg-emerald-500',
    debit: 'bg-red-400',
}


const typeTextColor = {
    credit: 'text-emerald-500',
    debit: 'text-red-400',
}


const LedgerIdColumn = ({ row }) => {
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onView = useCallback(() => {
        navigate(`/admin/order/details?id=${row?.orderId}`)
    }, [navigate, row])

    return (
        <span
            className={`cursor-pointer select-none font-semibold hover:${textTheme}`}
            onClick={onView}
        >
            #{row.id}
        </span>
    )
}

const LedgerTable = () => {
    const dispatch = useDispatch()


    const columns = useMemo(
        () => [
            {
                header: 'ledger Id',
                accessorKey: 'id',
                cell: (props) => {
                    const row = props.row.original
                    return <LedgerIdColumn row={row} />
                }
            },
            {
                header: 'Transaction Type',
                accessorKey: 'type',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                            <Badge
                                className={typeBgColor[row.type]}
                            />
                            <span
                                className={`ml-2 rtl:mr-2 capitalize font-semibold ${typeTextColor[row.type]}`}
                            >
                                {row.type}
                            </span>
                        </div>
                    )
                },
            },
            {
                header: 'amount',
                accessorKey: 'amount',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <NumericFormat
                            displayType="text"
                            value={(
                                Math.round(row?.amount * 100) / 100
                            ).toFixed(2)}
                            prefix={(row.type === 'credit' ? '+' : '-') + ' ' + '₹'}
                            thousandSeparator={true}
                        />
                    )
                }
            },
            {
                header: 'balance',
                accessorKey: 'balance',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <NumericFormat
                            displayType="text"
                            value={(
                                Math.round((row?.balance < 0 ? -(row?.balance) : row?.balance) * 100) / 100
                            ).toFixed(2)}
                            prefix={'₹'}
                            thousandSeparator={true}
                        />
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

    const data = useSelector((state) => state.adminShopDetails.data.shopLedgerList)
    const loading = useSelector((state) => state.adminShopDetails.data.loading)
    const { status } = useSelector(
        (state) => state.adminShopDetails.data.filterData
    )

    const searchQuery = useQuery()
    const shopId = searchQuery.get('id')

    const { pageIndex, pageSize, query, total } = useSelector(
        (state) => state.adminShopDetails.data.tableData
    )


    const fetchData = useCallback(() => {
        dispatch(getAllLedgerListByShopId({ pageIndex, pageSize, query, status, shopId }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex, pageSize, query, status, shopId])




    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex, pageSize, query, status, shopId])

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, query, total, shopId }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [pageIndex, pageSize, query, status, total, shopId]
    )

    useEffect(() => {
        dispatch(setTableData(tableData))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tableData])

    const onPaginationChange = (page) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex = page
        dispatch(setTableData(newTableData))
    }

    const onSelectChange = (value) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageSize = Number(value)
        newTableData.pageIndex = 1
        dispatch(setTableData(newTableData))
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

export default LedgerTable

