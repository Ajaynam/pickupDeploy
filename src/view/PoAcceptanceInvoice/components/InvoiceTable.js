import React, { useMemo } from 'react'
import { AdaptableCard } from '../../../components/shared'
import { Table } from '../../../components/ui'
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
} from '@tanstack/react-table'
import { NumericFormat } from 'react-number-format'
import TFoot from '../../../components/ui/Table/TFoot'

const { Tr, Th, Td, THead, TBody } = Table



const PriceAmount = ({ value }) => {
    return (
        <NumericFormat
            displayType="text"
            value={(Number(value)).toFixed(2)}
            prefix={'₹'}
            thousandSeparator={true}
        />
    )
}


const TFootRowsGST = ({ label, value }) => {
    return (
        <Tr>

            <Td style={{ padding: '8px 24px' }} className="!border-t-0" colSpan="3"></Td>
            <Td style={{ padding: '8px 24px' }} className=" !border-t-0">{label}</Td>
            <Td style={{ padding: '8px 24px' }} className=" !border-t-0">
                <NumericFormat
                    displayType="text"
                    value={Number(value).toFixed(2)}
                    prefix={'+ ₹'}
                    thousandSeparator={true}
                    thousandsGroupStyle='lakh'
                />
            </Td>
        </Tr>
    )
}


const TFootRows = ({ label, value }) => {
    return (
        <Tr>
            <Td style={{ padding: '8px 24px' }} className="!border-t-0" colSpan="3"></Td>
            <Td style={{ padding: '8px 24px' }} className="!border-t-0">{label}</Td>
            <Td style={{ padding: '8px 24px' }} className=" !border-t-0">
                <NumericFormat
                    displayType="text"
                    value={Number(value).toFixed(2)}
                    prefix={'₹'}
                    thousandSeparator={true}
                    thousandsGroupStyle='lakh'
                />
            </Td>
        </Tr>
    )
}


const InvoiceTable = ({ data, bill, status }) => {
    const columns = useMemo(
        () => [
            {
                header: 'po serial number',
                accessorKey: 'po_serial_number',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className='capitalize'>
                            {row?.po_serial_number}
                        </div>
                    )
                },
            },

            {
                header: 'Item Code',
                accessorKey: 'item_code',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className='capitalize'>
                            {row?.item_code}
                        </div>
                    )
                },
            },
            {
                header: 'drg rev no',
                accessorKey: 'drawing_revision_number',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className='capitalize'>
                            {row?.drawing_revision_number}
                        </div>
                    )
                },
            },
            {
                header: 'po quantity',
                accessorKey: 'po_quantity',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className='capitalize'>
                            {row?.po_quantity}
                        </div>
                    )
                },
            },
            {
                header: 'unit price',
                accessorKey: 'unit_price',
                cell: (props) => {
                    const row = props.row.original
                    return <PriceAmount value={row?.unit_price} />
                },
            },
            {
                header: 'net amount',
                accessorKey: 'net_amount',
                cell: (props) => {
                    const row = props.row.original
                    return <PriceAmount value={row?.net_amount} />
                },
            },

        ],
        []
    )

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })


    const orderStatusColor = {
        accepted: {
            label: 'accepted',
            dotClass: 'bg-emerald-500',
            textClass: 'text-emerald-500',
        },
        pending: {
            label: 'Pending',
            dotClass: 'bg-amber-500',
            textClass: 'text-amber-500',
        },
        cancel: {
            label: 'Cancel',
            dotClass: 'bg-red-500',
            textClass: 'text-red-500',
        },
        rejected: {
            label: 'Rejected',
            dotClass: 'bg-red-500',
            textClass: 'text-red-500',
        },
    }

    return (
        <>
            
            <hr></hr>
            <AdaptableCard className="mb-4">
                <Table>
                    <THead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <Tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <Th
                                            key={header.id}
                                            colSpan={header.colSpan}
                                        >
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                        </Th>
                                    )
                                })}
                            </Tr>
                        ))}
                    </THead>
                    <TBody>
                        {table.getRowModel().rows.map((row) => {
                            return (
                                <Tr key={row.id}>
                                    {row.getVisibleCells().map((cell) => {
                                        return (
                                            <Td key={cell.id} style={{ padding: '8px 24px' }}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </Td>
                                        )
                                    })}
                                </Tr>
                            )
                        })}
                    </TBody>
                </Table>
            </AdaptableCard>
            <div className='border mt-4 '></div>
                    <div className='grid grid-cols-2 p-4 '>
                        <div>
                            <p><strong>TERM & CONDITION: </strong></p>
                        </div>
                        <div>
                            {/* <TFootRowsGST label={`SGST(${bill?.sGST.toFixed(2) * 100}%)`} value={Math.round(bill?.sGST * bill?.total)} /> */}
                            {/* <TFootRowsGST label={`CGST(${bill?.cGST.toFixed(2) * 100}%)`} value={Math.round(bill?.cGST * bill?.total)} /> */}
                            <Tr>
                                <Td style={{ padding: '8px 24px' }} className="!border-t-1" colSpan="3"></Td>
                                <Td style={{ padding: '8px 24px' }} className="font-semibold text-base"> Total</Td>
                                <Td style={{ padding: '8px 24px' }} className="font-semibold text-base">
                                    <PriceAmount value={bill?.total} />
                                </Td>
                            </Tr>
                        </div>
                    </div>
                    <div className='border  '></div>

                    <div>
                        <p className="thank-you-message">Thank you for your purchase Order</p>
                    </div>
        </>
    )
}

export default InvoiceTable
