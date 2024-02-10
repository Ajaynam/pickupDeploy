import React, { useMemo } from 'react'
import { Card, Table, Badge } from '../../../components/ui'
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
} from '@tanstack/react-table'
import dayjs from 'dayjs'
import { NumericFormat } from 'react-number-format'

const { Tr, Td, TBody, THead, Th } = Table

const typeBgColor = {
    credit: 'bg-emerald-500',
    debit: 'bg-red-400',
}


const typeTextColor = {
    credit: 'text-emerald-500',
    debit: 'text-red-400',
}


const LatestLedger = ({ data = [], className }) => {

    const columns = useMemo(
        () => [
            {
                header: 'Id',
                accessorKey: 'id',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center capitalize font-semibold">
                            #{row.id}
                        </div>
                    )
                }
            },
            {
                header: 'Type',
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
                header: 'Shop name',
                accessorKey: 'name',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center capitalize">
                            {row.name}
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
                            prefix={(row.type === 'credit' ? '+' : '-')+ ' ₹'}
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
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <Card className={className}>
            <div className="flex items-center justify-between mb-6">
                <h4>Latest Ledger</h4>
                {/* <Button onClick={() => navigate('/ledger/list')} size="sm">View Ledger</Button> */}
            </div>
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
                                        <Td key={cell.id}>
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
        </Card>
    )
}

export default LatestLedger
