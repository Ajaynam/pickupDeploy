import React, { useEffect, useMemo, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import useThemeClass from '../../../utils/hooks/useThemeClass'
import DataTable from '../../../components/shared/DataTable'
import { Badge, } from '../../../components/ui'
import { NumericFormat } from 'react-number-format'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProductList, setTableData } from '../store/dataSlice'

const stockStatusColor = {
    instock: {
        label: 'In Stock',
        dotClass: 'bg-emerald-500',
        textClass: 'text-emerald-500',
    },
    limited: {
        label: 'Limited',
        dotClass: 'bg-amber-500',
        textClass: 'text-amber-500',
    },
    outofstock: {
        label: 'Out of Stock',
        dotClass: 'bg-red-500',
        textClass: 'text-red-500',
    },
}


const ProductColumn = ({ row }) => {
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onEdit = () => {
        navigate(`/product/details?id=${row.id}`)
    }
    return (

        <div onClick={onEdit} className="flex items-center cursor-pointer">
            <span className={`cursor-pointer hover:${textTheme} capitalize font-semibold`}>{row.name}</span>
        </div>

    )
}



const ProductTable = () => {



    const columns = useMemo(
        () => [
            {
                header: 'Name',
                accessorKey: 'name',
                cell: (props) => {
                    const row = props.row.original
                    return <ProductColumn row={row} />
                },
            },
            {
                header: 'Category',
                accessorKey: 'category.name',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row?.category?.name}</span>
                },
            },
            {
                header: 'Quantity',
                accessorKey: 'stock.quantity',
                cell: (props) => {
                    const row = props.row.original
                    return <NumericFormat
                        value={row?.stock?.quantity}
                        thousandSeparator=','
                        displayType='text'
                        thousandsGroupStyle='lakh' />
                },
            },
            {
                header: 'Pending stock',
                accessorKey: 'stock.pending',
                cell: (props) => {
                    const row = props.row.original
                    return <NumericFormat
                        value={row?.stock?.pending}
                        thousandSeparator=','
                        displayType='text'
                        thousandsGroupStyle='lakh' />
                },
            },
            {
                header: 'Stock status',
                accessorKey: 'stock.stock',
                cell: (props) => {
                    const row = props.row.original

                    return (
                        <div className="flex items-center gap-2">
                            <Badge
                                className={
                                    stockStatusColor[row?.stock?.stock]?.dotClass
                                }
                            />
                            <span
                                className={`capitalize font-semibold ${stockStatusColor[row?.stock?.stock]?.textClass}`}
                            >
                                {stockStatusColor[row?.stock?.stock]?.label}
                            </span>
                        </div>
                    )
                },
            },
            {
                header: 'Price',
                accessorKey: 'price',
                cell: (props) => {
                    const row = props.row.original
                    return <NumericFormat
                        value={row?.stock?.price}
                        thousandSeparator=','
                        prefix='₹' displayType='text'
                        thousandsGroupStyle='lakh' />
                },
            },
            // {
            //     header: 'Product status',
            //     accessorKey: 'status',
            //     cell: (props) => {
            //         const row = props.row.original

            //         return (
            //             <div className="flex items-center gap-2">
            //                 <Badge
            //                     className={
            //                         productStatusColor[row?.status]?.dotClass
            //                     }
            //                 />
            //                 <span
            //                     className={`capitalize font-semibold ${productStatusColor[row?.status]?.textClass}`}
            //                 >
            //                     {productStatusColor[row?.status]?.label}
            //                 </span>
            //             </div>
            //         )
            //     },
            // },
            // {
            //     header: 'Active/Inactive',
            //     accessorKey: 'status',
            //     cell: (props) => {
            //         const row = props.row.original
            //         return <Controlled row={row} />
            //     },
            // },
            // {
            //     header: 'Add Stock',
            //     accessorKey: 'addstock',
            //     cell: (props) => {
            //         const row = props.row.original
            //         return <AddStockColumn row={row} />
            //     },
            // },
        ],
        []
    )

    const tableRef = useRef(null)

    const dispatch = useDispatch()

    const { pageIndex, pageSize, sort, query, total } = useSelector(
        (state) => state.productList.data.tableData
    )

    const status = useSelector(
        (state) => state.productList.data.filterData
    )

    const loading = useSelector((state) => state.productList.data.loading)

    const data = useSelector((state) => state.productList.data.productList)
    // const data=productsData

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex, pageSize, sort, status])

    useEffect(() => {
        if (tableRef) {
            tableRef.current.resetSorting()
        }
    }, [status])

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total, status }),
        [pageIndex, pageSize, sort, query, total, status]
    )

    const fetchData = () => {
        dispatch(getAllProductList({ pageIndex, pageSize, sort, query, status }))
    }


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

    const onSort = (sort, sortingColumn) => {
        const newTableData = cloneDeep(tableData)
        newTableData.sort = sort
        dispatch(setTableData(newTableData))
    }

    return (
        <>
            <DataTable
                ref={tableRef}
                columns={columns}
                data={data}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ className: 'rounded-md' }}
                loading={loading}
                pagingData={tableData}
                onPaginationChange={onPaginationChange}
                onSelectChange={onSelectChange}
                onSort={onSort}
            />
            {/* <ProductDeleteConfirmation /> */}
        </>
    )
}

export default ProductTable
