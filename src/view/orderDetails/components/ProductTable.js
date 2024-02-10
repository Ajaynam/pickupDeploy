import React, { useMemo } from 'react'
import { AdaptableCard } from '../../../components/shared'
import { Table, Avatar, Card } from '../../../components/ui'
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
} from '@tanstack/react-table'
import { NumericFormat } from 'react-number-format'
import appConfig from '../../../configs/app.config'

const { Tr, Th, Td, THead, TBody } = Table

const ProductColumn = ({ row }) => {
    return (
        <div className="flex align-middle text-center">
            <Avatar size={40} src={appConfig.apiPrefix + row?.image} />
            <div className="ltr:ml-2 rtl:mr-2">
                <h6 className="mb-2">{row?.name}</h6>
            </div>
        </div>
    )
}

const PriceAmount = ({ amount }) => {
    return (
        <NumericFormat
            displayType="text"
            value={(Math.round(amount * 100) / 100).toFixed(2)}
            prefix={'₹'}
            thousandSeparator={true}
        />
    )
}

const OrderProducts = ({ data = [] }) => {
    const columns = useMemo(
        () => [
            {
                header: 'Product',
                accessorKey: 'product',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className='capitalize'>
                            {row?.product}
                        </div>
                    )
                },
            },
            {
                header: 'Category',
                accessorKey: 'category',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className='capitalize'>
                            {row?.category}
                        </div>
                    )
                },
            },
            {
                header: 'Price',
                accessorKey: 'price',
                cell: (props) => {
                    const row = props.row.original
                    return <PriceAmount amount={row.price} />
                },
            },
            {
                header: 'Quantity',
                accessorKey: 'quantity',
            },
            {
                header: 'Total',
                accessorKey: 'total',
                cell: (props) => {
                    const row = props.row.original
                    return <PriceAmount amount={row.price * row.quantity} />
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

    return (
        <Card className="mb-4">
            <AdaptableCard>
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
            </AdaptableCard>
        </Card>
    )
}

export default OrderProducts
