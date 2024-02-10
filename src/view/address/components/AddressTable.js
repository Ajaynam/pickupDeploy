import React, { useCallback, useMemo, useState } from 'react'
import useThemeClass from '../../../utils/hooks/useThemeClass'
import { Table } from '../../../components/ui'
import THead from '../../../components/ui/Table/THead'
import TBody from '../../../components/ui/Table/TBody'
import Tr from '../../../components/ui/Table/Tr'
import Td from '../../../components/ui/Table/Td'
import Th from '../../../components/ui/Table/Th'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { AdaptableCard } from '../../../components/shared'
import TableRowSkeleton from '../../../components/shared/loaders/TableRowSkeleton'
import StickyFooter from '../../../components/shared/StickyFooter'
import AddressForm from './AddressForm'
import { Formik } from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    id: Yup.string()
})


const NameColumn = ({ row, onNext, click }) => {
    const { textTheme } = useThemeClass()

    const onView = useCallback(() => {
        onNext(row?.id)
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [row])

    return (
        <span
            className={`${click && 'cursor-pointer'} select-none font-semibold hover:${click && textTheme} capitalize`}
            onClick={() => {
                if (click) {
                    onView()
                    return
                }
                return
            }}
        >
            {row?.name}
        </span>
    )
}
// const EditColumn = ({ row, onEdit }) => {
//     const { textTheme } = useThemeClass()

//     const onViewEdit = useCallback(() => {
//         onEdit(row)
//     }, [row])

//     return (
//         <span className={`flex items-center capitalize justify-center cursor-pointer font-semibold hover:${textTheme} select-none`} onClick={onViewEdit}>
//             <FiEdit2 />
//         </span>
//     )
// }


const AddressTable = ({ data, loading, onNext, click, onFormSubmit, formType = '' }) => {

    const [type, setType] = useState('new')
    // const [editData, setEditData] = useState()

    // const editFunc = (data) => {
    //     setType('edit')
    //     setEditData(data)
    // }
    const editFormFunc = (data) => {
        setType()
    }

    const columns = useMemo(
        () => [
            {
                header: 'name',
                accessorKey: 'name',
                cell: (props) => {
                    const row = props.row.original
                    return (<NameColumn row={row} onNext={onNext} click={click} />)
                }
            },
            // {
            //     header: 'Edit',
            //     accessorKey: 'action',
            //     cell: (props) => {
            //         const row = props.row.original
            //         return (<EditColumn row={row} onNext={onNext} onEdit={editFunc} />)
            //     }
            // },
        ],
         // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    )


    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })


    return (
        <AdaptableCard>
            {loading || data.length === 0 ? (
                <TableRowSkeleton
                    columns={3}
                    rows={5}
                    avatarInColumns={[0]}
                    avatarProps={{ width: 28, height: 28 }}
                />
            ) :
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
            <StickyFooter
                className="flex items-center justify-center p-0 m-0"
                stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            >
                <div className='flex'>
                    <Formik
                        enableReinitialize
                        initialValues={{
                            name: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={async (values, { setSubmitting }) => {
                            setSubmitting(true)
                            await onFormSubmit(values);
                            setSubmitting(false)
                        }}
                    >
                        {({ touched, errors, isSubmitting, values }) => (
                            <AddressForm
                                // data={editData}
                                touched={touched}
                                errors={errors}
                                formType={formType}
                                isSubmitting={isSubmitting}
                                values={values}
                                type={type}
                                onEdit={editFormFunc} />
                        )}
                    </Formik>
                </div>
            </StickyFooter>
        </AdaptableCard>
    )
}

export default AddressTable
