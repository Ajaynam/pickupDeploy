import React, { useEffect, useCallback, useMemo, useState } from 'react'
import { Badge, Dialog, Select, Tooltip } from '../../../components/ui'
import { HiOutlineEye } from 'react-icons/hi'
import { HiOutlineTrash } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import useThemeClass from '../../../utils/hooks/useThemeClass'
import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import dayjs from 'dayjs'
import DataTable from '../../../components/shared/DataTable'
import { getAllOrder, setTableData } from '../store/dataSlice'
import { NumericFormat } from 'react-number-format'
import PoAcceptanceTemplate from '../../PoAcceptanceTemplate'
import PurchaseOrderConfirmation from './PoAcceptance'
// import {
//     setSelectedRows,
//     addRowItem,
//     removeRowItem,
//     setDeleteMode,
//     setSelectedRow,
// } from '../store/stateSlice'


const dummyData = [
    {
        poId: 1,
        customer_name: 'John Doe',
        poStatus: 'Accepted',
        ItemCode: 'ABC123',
        DrawingRevision: 'Rev A',
        POQuantity: 10,
        PODate: '2023-01-01',
        PODeliveryDate: '2023-01-10',
        BrothersConfirmDate: '2023-01-10'
    },
    {
        poId: 2,
        customer_name: 'John Doe',
        poStatus: 'pending',
        ItemCode: 'ABC123',
        DrawingRevision: 'Rev A',
        POQuantity: 10,
        PODate: '2023-01-01',
        PODeliveryDate: '2023-01-10',
        BrothersConfirmDate: '2023-01-10'

    },
    {
        poId: 3,
        customer_name: 'John Doe',
        poStatus: 'pending',
        ItemCode: 'ABC123',
        DrawingRevision: 'Rev A',
        POQuantity: 10,
        PODate: '2023-01-01',
        PODeliveryDate: '2023-01-10',
        BrothersConfirmDate: '2023-01-10'

    },
    {
        poId: 4,
        customer_name: 'John Doe',
        poStatus: 'Accepted',
        ItemCode: 'ABC123',
        DrawingRevision: 'Rev A',
        POQuantity: 10,
        PODate: '2023-01-01',
        PODeliveryDate: '2023-01-10',
        BrothersConfirmDate: '2023-01-10'

    },
    {
        poId: 5,
        customer_name: 'John Doe',
        poStatus: 'rejected',
        ItemCode: 'ABC123',
        DrawingRevision: 'Rev A',
        POQuantity: 10,
        PODate: '2023-01-01',
        PODeliveryDate: '2023-01-10',
        BrothersConfirmDate: '2023-01-10'

    },
    {
        poId: 6,
        customer_name: 'John Doe',
        poStatus: 'rejected',
        ItemCode: 'ABC123',
        DrawingRevision: 'Rev A',
        POQuantity: 10,
        PODate: '2023-01-01',
        PODeliveryDate: '2023-01-10',
        BrothersConfirmDate: '2023-01-10'

    },
    // Add more dummy data as needed
];

const poStatusBgColor = {
    Accepted: 'bg-emerald-500',
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
const poStatusTextColor = {
    Accepted: 'text-emerald-500',
    pending: 'text-yellow-500',
    rejected: 'text-red-400',
}




const OrderColumn = ({ row }) => {
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onView = useCallback(() => {
        // navigate(`/PoAcceptance/List?id=${row.orderId}`)
        navigate(`/invoice/details`)
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


const OrdersTable = () => {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const closeDialog = () => {
        setDialogOpen(false);
    };

    const ActionColumn = ({ row }) => {
        // Function to open the dialog
        const openDialog = () => {
            setDialogOpen(true);
        };

        const { textTheme } = useThemeClass()

        const onDelete = () => {
            // dispatch(setDeleteMode('single'))
            // dispatch(setSelectedRow([row.id]))
        }


        return (
            <div className="flex justify-end text-lg">
                <Tooltip title="View">
                    <span
                        className={`cursor-pointer p-2 hover:${textTheme}`}
                        onClick={openDialog}
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
            </div>
        )
    }

    const dispatch = useDispatch()
    const columns = useMemo(
        () => [
            {
                header: 'PO Id',
                accessorKey: 'poId',
                cell: (props) => <OrderColumn row={props.row.original} />,
            },
            {
                header: 'Costumer Name',
                accessorKey: 'customer_name',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center capitalize">
                            {row?.customer_name}
                        </div>
                    )
                }
            },
            {
                header: 'PO status',
                accessorKey: 'poStatus',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                            <Badge
                                className={poStatusBgColor[row?.poStatus]}
                            />
                            <span
                                className={`ml-2 rtl:mr-2 capitalize font-semibold ${poStatusTextColor[row?.poStatus]}`}
                            >
                                {row?.poStatus}
                            </span>
                        </div>
                    )
                },
            },
            {
                header: 'Item Code',
                accessorKey: 'ItemCode',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center capitalize">
                            {row?.ItemCode}
                        </div>
                    )
                }
            },
            {
                header: 'Drawing Revision',
                accessorKey: 'DrawingRevision',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center capitalize">
                            {row?.DrawingRevision}
                        </div>
                    )
                }
            },
            {
                header: 'PO Quantity',
                accessorKey: 'POQuantity',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center capitalize">
                            {row?.POQuantity}
                        </div>
                    )
                }
            },

            {
                header: 'PO Date',
                accessorKey: 'PODate',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <span>{dayjs(row.PODate).format('DD/MM/YYYY')}</span>
                    )
                },
            },
            {
                header: 'PO Delivery Date',
                accessorKey: 'PODeliveryDate',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <span>{dayjs(row.PODeliveryDate).format('DD/MM/YYYY')}</span>
                    )
                },
            },
            {
                header: ' Confirm Delivery Date',
                accessorKey: 'BrothersConfirmDate',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <span>{dayjs(row.PODeliveryDate).format('DD/MM/YYYY')}</span>
                    )
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

    // const data = useSelector((state) => state.adminOrderList.data.orderList)
    // const loading = useSelector((state) => state.adminOrderList.data.loading)
    // const  } = useSelector(
    //     (state) => state.adminOrderList.data.filterData
    // )


    const data = dummyData;
    const loading = false;

    const { pageIndex, pageSize, query, total } = useSelector(
        (state) => state.adminOrderList.data.tableData
    )

    const fetchData = useCallback(() => {
        dispatch(getAllOrder({ pageIndex, pageSize, query }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex, pageSize, query])

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex, pageSize, query])

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, query, total }),
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
                pagingData={{ pageIndex, pageSize, query, total }}
                onPaginationChange={onPaginationChange}
                onSelectChange={onSelectChange}
            />

            <div className='overflow-scroll'>
                <Dialog
                    isOpen={isDialogOpen}
                    onClose={closeDialog} // Close the dialog when needed
                    closable={true} // You can customize this prop
                    width={1000}
                    height={800}
                // closeTimeoutMS={/* Set the close animation duration */}
                // portalClassName="your-portal-class" // Add your portal class
                // overlayClassName="your-overlay-class" // Add your overlay class
                // contentClassName="your-content-class" // Add your content class
                >
                    {/* <CreateUnitsDialog/> */}


                    <PurchaseOrderConfirmation />


                    {/* Add form or content for creating units here */}
                </Dialog>
            </div>
        </>
    )
}

export default OrdersTable
