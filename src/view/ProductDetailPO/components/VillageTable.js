
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Badge, Card, Notification, Switcher, Table, Toast } from '../../../components/ui'
import { useDispatch, useSelector } from 'react-redux'
import { getAllShopByEmployeeId, getAllVillageByEmployeeId, putUpdateVillagesAccessByEmployeeId, setTableData } from '../store/dataSlice'
import useQuery from '../../../utils/hooks/useQuery'
import { NumericFormat } from 'react-number-format'
import dayjs from 'dayjs'
import THead from '../../../components/ui/Table/THead';
import Th from '../../../components/ui/Table/Th';
import Tr from '../../../components/ui/Table/Tr';
import TBody from '../../../components/ui/Table/TBody';
import Td from '../../../components/ui/Table/Td';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Loading } from '../../../components/shared'






const Controlled = ({ row }) => {
    const dispatch = useDispatch()
    const searchQuery = useQuery()
    const employeeId = searchQuery.get('id')
    const [checked, setChecked] = useState(row?.checked)
    const [isLoading, setIsLoading] = useState(false)

    const onSwitcherToggle = async () => {
        setIsLoading(true)
        await villageAllocatedFunction()
        setChecked((checked) => !checked)
        setIsLoading(false)
    }

    const villageAllocatedFunction = useCallback(async () => {
        const action = await dispatch(putUpdateVillagesAccessByEmployeeId({ villageId: row.id, employeeId }))
        let notificationWithAvatar
        if (action.payload.status < 300) {
            notificationWithAvatar = (
                <Notification
                    title='success'
                    type='success'
                >
                    {action?.payload?.data?.message}
                </Notification>
            )
        } else {
            notificationWithAvatar = (
                <Notification
                    title='Failed'
                    type='danger'
                >
                    {action?.payload?.data?.message}
                </Notification>
            )
        }
        Toast.push(notificationWithAvatar)
        dispatch(getAllShopByEmployeeId({ pageIndex: 1, pageSize: 10, query: '', status: '', employeeId }))
        dispatch(getAllVillageByEmployeeId({ employeeId }))
        return
    }, [checked])

    return (
        <div>
            <Switcher size='sm' checked={checked} isLoading={isLoading} onChange={onSwitcherToggle} />
        </div>
    )
}


const VillageTable = () => {
    const dispatch = useDispatch()


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
                header: 'Village name',
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
                header: 'action',
                accessorKey: 'action',
                cell: (props) => {
                    const row = props.row.original
                    return <Controlled row={row} />
                },
            }
        ],
        []
    )

    const village = useSelector((state) => state.adminOwnerDetails.data.villageList)
    const loading = useSelector((state) => state.adminOwnerDetails.data.villageLoading)

    const searchQuery = useQuery()
    const employeeId = searchQuery.get('id')


    const fetchData = useCallback(() => {
        dispatch(getAllVillageByEmployeeId({ employeeId }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [employeeId])



    const data = useMemo(() => {
        return village.map((village) => {
            if (village?.employeeId === Number(employeeId)) {
                return { ...village, checked: true }
            } else {
                return { ...village, checked: false }
            }
        })
    }, [village, employeeId])


    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [employeeId])


    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (

        <Card>
            <div className='mb-4'>
                <h4>Village list</h4>
            </div>
            {loading ? <Loading loading={loading} /> :
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
            }
        </Card>
    )
}

export default VillageTable

