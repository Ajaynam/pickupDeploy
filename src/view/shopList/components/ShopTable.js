
import React, { useCallback, useEffect, useMemo } from 'react'
import { Alert } from '../../../components/ui'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import DataTable from '../../../components/shared/DataTable'
import cloneDeep from 'lodash/cloneDeep';
import { getAllShop, setTableData } from '../store/dataSlice'
import useThemeClass from '../../../utils/hooks/useThemeClass';
import dayjs from 'dayjs'
import { BiPencil } from 'react-icons/bi'
import { setDrawerOpen, setSelectedShop } from '../store/stateSlice'
import ShopEditDialog from './ShopEditDialog'


const IdColumn = ({ row }) => {
    const { textTheme } = useThemeClass()

    return (
        <div className="flex items-center capitalize">
            <Link
                className={`hover:${textTheme} ml-2 rtl:mr-2 font-semibold`}
                to={`/shop/details?id=${row?.id}`}
            >
                #{row?.id}
            </Link>
        </div>
    )
}

const EditColumn = ({ row }) => {
    const { textTheme } = useThemeClass()
    const dispatch = useDispatch()

    const onEdit = () => {
        dispatch(setDrawerOpen())
        dispatch(setSelectedShop(row))
    }


    return (
        <div className="flex items-center capitalize">
            <span className={`hover:${textTheme} cursor-pointer`} onClick={onEdit} style={{ fontSize: '22px' }} >
                <BiPencil />
            </span>
        </div>
    )
}

const ShopTable = () => {
    const dispatch = useDispatch()

    const columns = useMemo(
        () => [
            {
                header: 'Shop ID',
                accessorKey: 'shopId',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <IdColumn row={row} />
                    )
                }
            },
            {
                header: 'shopname',
                accessorKey: 'name',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center capitalize">
                            {row?.name}
                        </div>
                    )
                }
            },
            {
                header: 'Mobile',
                accessorKey: 'mobile',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                            {row.mobile}
                        </div>
                    )
                },
            },
            {
                header: 'Village/Town',
                accessorKey: 'village',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                            {row?.villageName}
                        </div>
                    )
                },
            },
            {
                header: 'Block',
                accessorKey: 'block',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center capitalize">
                            {row?.blockName}
                        </div>
                    )
                },
            },
            // {
            //     header: 'Pincode',
            //     accessorKey: 'pincode',
            //     cell: (props) => {
            //         const row = props.row.original
            //         return (
            //             <div className="flex items-center">
            //                 {row?.pincode}
            //             </div>
            //         )
            //     },
            // },
            {
                header: 'Reg. Date',
                accessorKey: 'createDate',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                            {dayjs(row?.createDate).format('DD/MM/YYYY')}
                        </div>
                    )
                },
            },
            {
                header: 'Action',
                accessorKey: '',
                cell: (props) => {
                    const row = props.row.original
                    return (<EditColumn row={row} />)
                },
            },
            // {
            //     header: 'Pincode',
            //     accessorKey: 'pincode',
            //     cell: (props) => {
            //         const row = props.row.original
            //         return (
            //             <div className="flex items-center">
            //                 {row?.pincode}
            //             </div>
            //         )
            //     },
            // },
            // {
            //     header: 'Reg. Date',
            //     accessorKey: 'createDate',
            //     cell: (props) => {
            //         const row = props.row.original
                   
            //         return (
            //             <div className="flex items-center">
            //                 {dayjs(row?.createDate).format('DD/MM/YYYY')}
            //             </div>
            //         )
            //     },
            // },
        ],
        []
    )

    const data = useSelector((state) => state.adminShopList.data.shopList)
    const message = useSelector((state) => state.adminShopList.data.message)
    const loading = useSelector((state) => state.adminShopList.data.loading)
    const { status } = useSelector(
        (state) => state.adminShopList.data.filterData
    )

    const { pageIndex, pageSize, query, total } = useSelector(
        (state) => state.adminShopList.data.tableData
    )


    const fetchData = useCallback(() => {
        dispatch(getAllShop({ pageIndex, pageSize, query, status }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex, pageSize, query, status])

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex, pageSize, query])

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, query, total }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [pageIndex, pageSize, query, total]
    )

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
        <>
            {message ? <Alert type='info'>
                {message}
            </Alert> :
                <DataTable
                    columns={columns}
                    data={data}
                    skeletonAvatarColumns={[0]}
                    skeletonAvatarProps={{ width: 28, height: 28 }}
                    loading={loading}
                    pagingData={{ pageIndex, pageSize, query, total, status }}
                    onPaginationChange={onPaginationChange}
                    onSelectChange={onSelectChange}
                />
            }
            <ShopEditDialog />
        </>
    )
}

export default ShopTable

