import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, Tooltip } from '../../../components/ui';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import DataTable from '../../../components/shared/DataTable';
import cloneDeep from 'lodash/cloneDeep';
import { deleteOrders, getAllSupplier, setTableData } from '../store/dataSlice';
import useThemeClass from '../../../utils/hooks/useThemeClass';
import { HiOutlineEye, HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi';
import { Loading } from '../../../components/shared';

const IdColumn = ({ row }) => {
    const { textTheme } = useThemeClass();

    return (
        <div className="flex items-center capitalize">
            <Link
                className={`hover:${textTheme} ml-2 rtl:mr-2 font-semibold`}
                to={`/orders/details?userId=${row?.id}`}
            >
                #{row?.id}
            </Link>
        </div>
    );
};

const ShopOwnerTable = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleIDClick = (id) => {
        navigate(`/orders/details/${id}`);
    };
    
    const columns = useMemo(
        () => [
            
            {
                header: 'order Date',
                accessorKey: 'orderDate',
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <div className="flex items-center cursor-pointer capitalize" >
                            {row.orderDate}
                        </div>
                    );
                }
            },
            {
                header: 'Pickup Contact Name',
                accessorKey: 'pname',
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <div className="flex items-center cursor-pointer capitalize" onClick={() => handleIDClick(row.id)}>
                            {row.pname}
                        </div>
                    );
                }
            },
            {
                header: 'Pickup Mobile',
                accessorKey: 'pnumber',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center capitalize">
                            {row?.pnumber}
                        </div>
                    )
                }
            },
            {
                header: 'Pickup Address',
                accessorKey: 'paddress',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center capitalize">
                            {row?.paddress}
                        </div>
                    )
                }
            },
            {
                header: 'Pickup Pincode',
                accessorKey: 'ppin',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                            {row.ppin}
                        </div>
                    )
                },
            },
            {
                header: 'Deliver Pincode',
                accessorKey: 'dpin',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center capitalize">
                            {row?.dpin}
                        </div>
                    )
                },
            },
            {
                header: 'Package Type',
                accessorKey: 'packageType',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex  text-blue-500 items-center">
                            {row?.packageType}
                        </div>
                    )
                },
            },
            {
                header: 'Date',
                accessorKey: 'orderDate',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center capitalize">
                            {row?.orderDate}
                        </div>
                    )
                },
            },
            {
                header: 'Actions',
                id: 'action',
                cell: (props) => <ActionColumn row={props.row.original} />,
            },
        ],
        []
    );

    const [searchQuery, setSearchQuery] = useState('');
    const [filterValue, setFilterValue] = useState('');

    const data = useSelector((state) => state.adminShopOwnerList1.data.shopOwnerList);
    const loading = useSelector((state) => state.adminShopOwnerList1.data.loading);
    const { status } = useSelector((state) => state.adminShopOwnerList1.data.filterData);

    const { pageIndex, pageSize, query, total } = useSelector((state) => state.adminShopOwnerList1.data.tableData);

    const fetchData = useCallback(() => {
        dispatch(getAllSupplier({ pageIndex, pageSize, query, status,total }));
    }, [dispatch, pageIndex, pageSize, query, status ,total]);
        const onPaginationChange = (page) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex = page
        dispatch(setTableData(newTableData))
    }

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, query, total }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [pageIndex, pageSize, query, total]
    )

    const onSelectChange = (value) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageSize = Number(value)
        newTableData.pageIndex = 1
        dispatch(setTableData(newTableData))
    }

    useEffect(() => {
        fetchData();
    }, [fetchData]);

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
        const navigate = useNavigate();

        const onDelete = () => {
            if (window.confirm('Are you sure you want to delete this order?')) {
                dispatch(deleteOrders(row.id));
                fetchData();
            }
        };

        const onView = (id) => {
            navigate(`/orders/details/${id}`);
        };

        

        return (
            <div className="flex justify-end text-lg">
                {/* <Tooltip title="View">
                    <span className="cursor-pointer p-2" onClick={() => onView(row.id)}>
                        <HiOutlineEye />
                    </span>
                </Tooltip> */}
                <Tooltip title="Delete">
                    <span className="cursor-pointer p-2" onClick={onDelete}>
                        <HiOutlineTrash />
                    </span>
                </Tooltip>
            </div>
        );
    };

    return (
        <div style={{ overflowX: 'auto', position: 'relative' }}>
            <div className="flex justify-end mb-4">
                <input
                    type="text"
                    className="p-2 font-lg shadow border border-blue-500 border-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"

                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <select
                    className="p-2 ml-4 font-lg shadow border border-block"
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
            {/* {filteredData.length === 0 && (
                <Alert type='info'>
                    No results found.
                </Alert>
            )} */}
              {/* {filteredData.length === 0 && (
              <Loading loading={true}/>
            )} */}
        </div>
    );
};

export default ShopOwnerTable;
