
import React, { useCallback, useEffect, useMemo } from 'react'
import {  Badge } from '../../../components/ui'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import DataTable from '../../../components/shared/DataTable'
import cloneDeep from 'lodash/cloneDeep';
import useThemeClass from '../../../utils/hooks/useThemeClass';
import { getEmployee, setTableData } from '../store/dataSlice'
import dayjs from 'dayjs'
import { NumericFormat } from 'react-number-format'
import EmployeeEditDialog from './EmployeeEditDialog'

const statusColor = {
    active: 'bg-emerald-500',
    inactive: 'bg-red-400',
}



const NameColumn = ({ row }) => {
    const { textTheme } = useThemeClass()

    return (
        <div className="flex items-center capitalize">
            <Link
                className={`hover:${textTheme} ml-2 rtl:mr-2 font-semibold`}
                to={`/employee/details?id=${row?.id}`}
            >
                #{row?.id}
            </Link>
        </div>
    )
}


// const EditColumn = ({ row }) => {
//     const { textTheme } = useThemeClass()
//     const dispatch = useDispatch()

//     const onEdit = () => {
//         dispatch(setDrawerOpen())
//         dispatch(setSelectedEmployee(row))
//     }


//     return (
//         <div className="flex items-center capitalize">
//             <span className={`hover:${textTheme} cursor-pointer`} onClick={onEdit} style={{ fontSize: '22px' }} >
//                 <BiPencil />
//             </span>
//         </div>
//     )
// }


const EmployeeTable = () => {
    const dispatch = useDispatch()

    const columns = useMemo(
        () => [
            {
                header: 'Employee ID',
                accessorKey: 'id',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <NameColumn row={row} />
                    )
                }
            },
            {
                header: 'Name',
                accessorKey: 'name',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
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
                header: 'Target',
                accessorKey: 'target.total',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                            <NumericFormat
                                value={row?.target?.total || 0}
                                displayType='text'
                                thousandSeparator=','
                                thousandsGroupStyle='lakh' />
                        </div>
                    )
                },
            },
            {
                header: 'Pending',
                accessorKey: 'target.pending',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                            <NumericFormat
                                value={row?.target?.pending || 0}
                                displayType='text'
                                thousandSeparator=','
                                thousandsGroupStyle='lakh' />
                        </div>
                    )
                },
            },
            {
                header: 'Username',
                accessorKey: 'username',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                            {row?.username}
                        </div>
                    )
                },
            },
            {
                header: 'status',
                accessorKey: 'status',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                            <Badge className={statusColor[row.status]} />
                            <span className="ml-2 rtl:mr-2 capitalize">
                                {row.status}
                            </span>
                        </div>
                    )
                }
            },
            {
                header: 'Reg. Date',
                accessorKey: 'createDate',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        dayjs(row.createDate).format('DD//MM/YYYY')
                    )
                },
            },
            // {
            //     header: 'Action',
            //     accessorKey: '',
            //     cell: (props) => {
            //         const row = props.row.original
            //         return (<EditColumn row={row} />)
            //     },
            // },
        ],
        []
    )

    const data = useSelector((state) => state.adminEmployeeList.data.employeeList)
    const loading = useSelector((state) => state.adminEmployeeList.data.loading)
    const { status } = useSelector(
        (state) => state.adminEmployeeList.data.filterData
    )

    const { pageIndex, pageSize, query, total } = useSelector(
        (state) => state.adminEmployeeList.data.tableData
    )



    const fetchData = useCallback(() => {
        dispatch(getEmployee({ pageIndex, pageSize, query, status }))
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
            <EmployeeEditDialog />
        </>
    )
}

export default EmployeeTable

