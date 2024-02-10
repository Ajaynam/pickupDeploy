
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Alert, Tooltip } from '../../../components/ui'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import DataTable from '../../../components/shared/DataTable'
import cloneDeep from 'lodash/cloneDeep';
import { deleteOrders, getAllSupplier, setTableData } from '../store/dataSlice'
import useThemeClass from '../../../utils/hooks/useThemeClass';
import { HiOutlineEye, HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import { Loading } from '../../../components/shared'
// import {

//     setDeleteMode,
//     setSelectedRow,
// } from '../store/stateSlice'

const IdColumn = ({ row }) => {
    const { textTheme } = useThemeClass()

    return (
        <div className="flex items-center capitalize">
            <Link
                className={`hover:${textTheme} ml-2 rtl:mr-2 font-semibold`}
                to={`/orders/details?userId=${row?.id}`}
            >
                #{row?.id}
            </Link>
        </div>
    )
}



const ShopOwnerTable = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleIDClick = (id) => {
        navigate(`/orders/details/${id}`);
    };



    const columns = useMemo(
        () => [
            // {
            //     header: ' Id',
            //     accessorKey: 'id',
            //     cell: (props) => {
            //         const row = props.row.original;  
            //         return (
            //             <IdColumn row={row} />  
            //         );
            //     }
            // },

            {
                header: 'ID',
                accessorKey: 'id',
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <div className="flex items-center cursor-pointer capitalize" onClick={() => handleIDClick(row.id)}>
                            #{row.id}
                        </div>
                    );
                }
            },
            {
                header: 'Order Date',
                accessorKey: 'orderDate',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center capitalize">
                            {row?.orderDate}
                        </div>
                    )
                }
            },
            {
                header: 'sender name ',
                accessorKey: 'pname',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center capitalize">
                            {row?.pname}
                        </div>
                    )
                }
            },
            {
                header: 'Pickup City',
                accessorKey: 'pcity',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                            {row.pcity}
                        </div>
                    )
                },
            },

            {
                header: 'Pickup State',
                accessorKey: 'pstate',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center capitalize">
                            {row?.pstate}
                        </div>
                    )
                },
            },
            {
                header: 'Pickup Pincode',
                accessorKey: 'ppin',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                            {row?.ppin}
                        </div>
                    )
                },
            },
            {
                header: 'Delivery City',
                accessorKey: 'dcity',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                            {row?.dcity}
                        </div>
                    )
                },
            },
            {
                header: 'Delivery State',
                accessorKey: 'dstate',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                            {row?.dstate}
                        </div>
                    )
                },
            },
            {
                header: 'Drop Pin',
                accessorKey: 'dpin',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                            {row?.dpin}
                        </div>
                    )
                },
            },
            {
                header: 'Ship Type',
                accessorKey: 'shiptype',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex  text-blue-500 items-center">
                            {row?.shiptype}
                        </div>
                    )
                },
            },
            {
                header: 'Status',
                accessorKey: 'status',
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <div className={`flex items-center ${row.status === 'picked-up' ? 'text-green-500 font-bold' : 'text-orange-500 font-bold'}`}>
                            {row.status}
                        </div>
                    );
                },
            },
            {
                header: 'Action',
                id: 'action',
                cell: (props) => <ActionColumn row={props.row.original} />,
            },



        ],
        []
    )

    const [searchQuery, setSearchQuery] = useState('');
    const [filterValue, setFilterValue] = useState('');

    const data = useSelector((state) => state.adminShopOwnerList.data.shopOwnerList)
    console.log("", data)
    const message = useSelector((state) => state.adminShopOwnerList.data.message)
    const loading = useSelector((state) => state.adminShopOwnerList.data.loading)
    const { status } = useSelector(
        (state) => state.adminShopOwnerList.data.filterData
    )

    const { pageIndex, pageSize, query, total } = useSelector(
        (state) => state.adminShopOwnerList.data.tableData
    )


    const fetchData = useCallback(() => {
        dispatch(getAllSupplier({ pageIndex, pageSize, query, status }))
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

    const filteredData = useMemo(() => {
        let filtered = data;

        if (searchQuery.trim()) {
            filtered = filtered.filter(row =>
                Object.values(row).some(cell =>
                    String(cell).toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        }

        if (filterValue) {
            filtered = filtered.filter(row =>
                String(row.status).toLowerCase() === filterValue.toLowerCase()
            );
        }

        return filtered;
    }, [data, searchQuery, filterValue]);

    const handleSearchChange = useCallback((e) => {
        setSearchQuery(e.target.value);
    }, []);

    const handleFilterChange = useCallback((e) => {
        setFilterValue(e.target.value);
    }, []);

    const handlePaginationChange = (newPageIndex) => {
        dispatch(setTableData({ pageIndex: newPageIndex, pageSize }));
    };

    const handlePageSizeChange = (event) => {
        const newPageSize = Number(event.target.value);
        dispatch(setTableData({ pageIndex: 1, pageSize: newPageSize }));
    };

    const uniqueStatusValues = useMemo(() => {
        const statusSet = new Set(data.map(row => row.status));
        return Array.from(statusSet);
    }, [data]);




    const ActionColumn = ({ row }) => {
        const dispatch = useDispatch()
        const { textTheme } = useThemeClass()
        const navigate = useNavigate()

        const onDelete = () => {

            if (window.confirm('Are you sure you want to delete this order?')) {

                dispatch(deleteOrders(row.id));
                fetchData();

            }

        }


        const onView = (id) => {
            navigate(`/orders/details/${id}`);
        }
        const onEdit = (id) => {
            navigate(`/orders/edit/${id}`);
        }

        return (
            <div className="flex justify-end text-lg">
                <Tooltip title="View">
                    <span
                        className={`cursor-pointer p-2 hover:${textTheme}`}
                        onClick={() => onView(row.id)}
                    >
                        <HiOutlineEye />
                    </span>
                </Tooltip>
                <Tooltip title="Delete">
                    <span
                        className="cursor-pointer p-2 hover:text-red-500"
                        onClick={onDelete}
                    >
                        <HiOutlineTrash />
                    </span>
                </Tooltip>
                <Tooltip title="Edit">
                    <span
                        className="cursor-pointer p-2 hover:text-red-500"
                        onClick={() => onEdit(row.id)}
                    >
                        <HiOutlinePencil />
                    </span>
                </Tooltip>
            </div>
        )
    }

    return (
        <>
            <div className="flex justify-end mb-4">
                <input
                    type="text"
                    className="p-2 font-lg shadow border border-blue-500 border-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"

                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />

                <select
                    className="p-2 ml-4 font-lg shadow border border-block focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={filterValue}
                    onChange={handleFilterChange}
                >
                    <option value="">Filter by Status</option>
                    {uniqueStatusValues.map((status, index) => (
                        <option key={index} value={status}>{status}</option>
                    ))}
                </select>
            </div>
            <DataTable
                columns={columns}
                data={filteredData}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ width: 28, height: 28 }}
                onPageChange={handlePaginationChange}
                onPageSizeChange={handlePageSizeChange}
                pageIndex={pageIndex}
                pageSize={pageSize}
                totalRows={total}
                loading={loading}
                pagingData={{ pageIndex, pageSize, query, total, status }}
                onPaginationChange={onPaginationChange}
                onSelectChange={onSelectChange}
            />
            {/* {loading && <Loading loading={true} />} */}
            {/* {filteredData.length === 0 && (
              <Loading loading={true}/>
            )} */}
        </>


    )
}

export default ShopOwnerTable;

