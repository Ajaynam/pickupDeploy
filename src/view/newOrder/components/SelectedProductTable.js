import React, { useMemo } from 'react'
import { AdaptableCard } from '../../../components/shared'
import { Table, Button } from '../../../components/ui'
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
} from '@tanstack/react-table'
import { NumericFormat } from 'react-number-format'
import { AiFillDelete } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { setRemoveSelectedProducts } from '../store/stateSlice'

const { Tr, Th, Td, THead, TBody } = Table



const PriceAmount = ({ row }) => {
    return (
        <NumericFormat
            displayType="text"
            value={(row.amount).toFixed(2)}
            prefix={'₹'}
            thousandSeparator={true}
        />
    )
}

const SelectedProductTable = () => {
    const product = useSelector(state => state.adminNewOrder.state.selectedProductNameList)
    const quantity = useSelector(state => state.adminNewOrder.state.selectedQuantity)
    const price = useSelector(state => state.adminNewOrder.state.selectedPrice)
    const category = useSelector(state => state.adminNewOrder.state.selectedCategory)

    const data = useMemo(() => {
        const result = product.map((item, index) => {
            return {
                // name: item.name,
                quantity: quantity[index],
                price: price[index],
                amount: price[index] * quantity[index],
                index: [index],
                category: category[index]
            }
        })
        return result
    }, [quantity, product, price, category])

    const dispatch = useDispatch()
    const handleDelete = (index) => {
        dispatch(setRemoveSelectedProducts(index));
    };
    const columns = useMemo(
        () => [
            // {
            //     header: 'customer name',
            //     accessorKey: 'name',
            //     cell: (props) => {
            //         const row = props.row.original
            //         return (
            //             <div className='capitalize'>
            //                 {row?.name}
            //             </div>
            //         )
            //     },
            // },
           
             {
                header: 'PO Number',
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
                header: 'POSerial Number',
                accessorKey: 'price',
                cell: (props) => {
                    const row = props.row.original
                    return <NumericFormat value={row?.price} displayType='text' prefix='₹' thousandSeparator=',' thousandsGroupStyle='lakh' />
                },
            },
            {
                header: 'ItemCode',
                accessorKey: 'ItemCode',
            },
            {
                header: 'Unit Price',
                accessorKey: 'UnitPrice',
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
                header: 'Net Amount',
                accessorKey: 'amount',
                cell: (props) => {
                    const row = props.row.original
                    return <PriceAmount row={row} />
                },
            },
            {
                // header: 'Total',
                accessorKey: 'action',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <Button type='button' size='sm' onClick={() => handleDelete(row?.index)}>
                            <AiFillDelete />
                        </Button>
                    )
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
    )
}

export default SelectedProductTable
