
import React, { useCallback, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import DataTable from '../../../components/shared/DataTable'
import cloneDeep from 'lodash/cloneDeep';
import { getAllShopByEmployeeId, setShopTableData } from '../store/dataSlice'
import useThemeClass from '../../../utils/hooks/useThemeClass';
import useQuery from '../../../utils/hooks/useQuery'


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



const ShopTable = () => {
    const dispatch = useDispatch()

    const columns = useMemo(
        () => [
            {
                header: 'Attachement Id',
                accessorKey: 'attachement',
                cell: (props) => {
                    const row = props.row.original
                    return (
                       <IdColumn row={row}/>
                    )
                }
            },
            {
                header: 'raw drawing attachment',
                accessorKey: 'raw_drawing_attachment',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center capitalize">
                            {row?.raw_drawing_attachment}
                        </div>
                    )
                }
            },
            {
                header: 'finish drawing attachment',
                accessorKey: 'finish_drawing_attachment',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                            {row?.finish_drawing_attachment }
                        </div>
                    )
                },
            },
            {
                header: 'process sheet attachment',
                accessorKey: 'process_sheet_attachment',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                            {row.process_sheet_attachment}
                        </div>
                    )
                },
            },
           
           
        ],
        []
    )

    const data = useSelector((state) => state.adminOwnerDetails.data.shopList)

    // const message = useSelector((state) => state.employeeDetail.data.message)
    const loading = useSelector((state) => state.adminOwnerDetails.data.shopListLoading)
    const { status } = useSelector(
        (state) => state.adminOwnerDetails.data.shopFilterData
    )

    const { pageIndex, pageSize, query, total } = useSelector(
        (state) => state.adminOwnerDetails.data.shopTableData
    )


    const getQuery = useQuery()
    const ownerId = getQuery.get('id')

    const fetchData = useCallback(() => {
        dispatch(getAllShopByEmployeeId({ pageIndex, pageSize, query, status, ownerId }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex, pageSize, query, status, ownerId])

    useEffect(() => {
        if (ownerId)
            fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex, pageSize, query, ownerId])

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, query, total, ownerId }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [pageIndex, pageSize, query, total, ownerId]
    )

    const onPaginationChange = (page) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex = page
        dispatch(setShopTableData(newTableData))
    }

    const onSelectChange = (value) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageSize = Number(value)
        newTableData.pageIndex = 1
        dispatch(setShopTableData(newTableData))
    }

    return (
        <>
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
        </>
    )
}

export default ShopTable

