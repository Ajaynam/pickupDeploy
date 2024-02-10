
import React, { useCallback, useEffect, useMemo } from 'react'
import { Alert } from '../../../components/ui'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import DataTable from '../../../components/shared/DataTable'
import cloneDeep from 'lodash/cloneDeep';
import { getAllProduct, setTableData } from '../store/dataSlice'
import useThemeClass from '../../../utils/hooks/useThemeClass';


const IdColumn = ({ row }) => {
    const { textTheme } = useThemeClass()

    return (
        <div className="flex items-center capitalize">
            {/* <Link
                className={`hover:${textTheme} ml-2 rtl:mr-2 font-semibold`}
                to={`/owner/details?id=${row?.id}`}
            >
                #{row?.id}
            </Link> */}

            {/* <Link
                className={`hover:${textTheme} ml-2 rtl:mr-2 font-semibold`}
                to={`/owner/details?id=${row?.id}`}
            >
                #{row?.product_id}
            </Link> */}
        </div>
    )
}

const PoProductMaster = () => {
    const dispatch = useDispatch()
    const { textTheme } = useThemeClass()
    const columns = useMemo(
        () => [
            // {
            //     header: ' Id',
            //     accessorKey: 'product_id',
            //     cell: (props) => {
            //         const row = props.row.id
            //         return (
            //             <IdColumn row={row?.id} />
            //         )
            //     }
            // },

            {
                header: 'Product ID',
                accessorKey: 'product_id',
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <div className="flex items-center capitalize">
                            <Link
                                className={`hover:${textTheme} ml-2 rtl:mr-2 font-semibold`}
                                to={`/owner/details?id=${row?.product_id}`}
                            >
                                #{row?.product_id}
                            </Link>
                        </div>
                    );
                },
            },
           
            {
                header: 'product name ',
                accessorKey: 'product_name',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center capitalize">
                            {row?.product_name}
                        </div>
                    )
                }
            },
            {
                header: 'item code',
                accessorKey: 'item_code',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                            {row.item_code}
                        </div>
                    )
                },
            },

            // {
            //     header: 'drawing number',
            //     accessorKey: 'drawing number',
            //     cell: (props) => {
            //         const row = props.row.original
            //         return (
            //             <div className="flex items-center capitalize">
            //                 {row?.drawing_number }
            //             </div>
            //         )
            //     },
            // },
            {
                header: 'hsn code',
                accessorKey: 'hsn_code',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                            {row?.hsn_code}
                        </div>
                    )
                },
            },
            {
                header: ' Unit',
                accessorKey: 'product_um',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                            {row?.product_um}
                        </div>
                    )
                },
            },


        ],
        []
    )

    const data = useSelector((state) => state.adminPoMasterList.data.shopOwnerList)
    const message = useSelector((state) => state.adminPoMasterList.data.message)
    const loading = useSelector((state) => state.adminPoMasterList.data.loading)
    const { status } = useSelector(
        (state) => state.adminPoMasterList.data.filterData
    )

    const { pageIndex, pageSize, query, total } = useSelector(
        (state) => state.adminPoMasterList.data.tableData
    )


    const fetchData = useCallback(() => {
        dispatch(getAllProduct({ pageIndex, pageSize, query, status }))
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

export default PoProductMaster;

