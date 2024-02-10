
import React, { useCallback, useEffect, useMemo } from 'react'
import { Alert } from '../../../components/ui'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import DataTable from '../../../components/shared/DataTable'
import cloneDeep from 'lodash/cloneDeep';
import { getAllShopOwner, setTableData } from '../store/dataSlice'
import useThemeClass from '../../../utils/hooks/useThemeClass';


const IdColumn = ({ row }) => {
    const { textTheme } = useThemeClass()

    return (
        <div className="flex items-center capitalize">
            <Link
                className={`hover:${textTheme} ml-2 rtl:mr-2 font-semibold`}
                to={`/owner/details?id=${row?.id}`}
            >
                #{row?.id}
            </Link>
        </div>
    )
}

const ShopOwnerTable = () => {
    const dispatch = useDispatch()

    const columns = useMemo(
        () => [
            {
                header: 'Owner ID',
                accessorKey: 'shopId',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <IdColumn row={row} />
                    )
                }
            },
            {
                header: 'Shop Owner',
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
                    const row = props.row.original;
                    return (
                        <div className="flex items-center">
                            {row?.village}
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
                            {row?.block}
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

    const data = useSelector((state) => state.adminShopOwnerList.data.shopOwnerList)
    const message = useSelector((state) => state.adminShopOwnerList.data.message)
    const loading = useSelector((state) => state.adminShopOwnerList.data.loading)
    const { status } = useSelector(
        (state) => state.adminShopOwnerList.data.filterData
    )

    const { pageIndex, pageSize, query, total } = useSelector(
        (state) => state.adminShopOwnerList.data.tableData
    )


    const fetchData = useCallback(() => {
        dispatch(getAllShopOwner({ pageIndex, pageSize, query, status }))
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
        </>
    )
}

export default ShopOwnerTable;

