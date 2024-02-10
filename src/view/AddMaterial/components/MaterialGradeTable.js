

import React, { useCallback, useEffect, useMemo } from 'react'
import { Alert } from '../../../components/ui'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import DataTable from '../../../components/shared/DataTable'
import cloneDeep from 'lodash/cloneDeep';
import { getmaterialGrades, setTableData } from '../store/dataSlice'
import useThemeClass from '../../../utils/hooks/useThemeClass';


const IdColumn = ({ row }) => {
    const { textTheme } = useThemeClass()

    return (
        <div className="flex items-center capitalize">
            <Link
                className={`hover:${textTheme} ml-2 rtl:mr-2 font-semibold`}
                to={`/owner/details?id=${row?.id}`}
            >
                #{row?.id}
            </Link>
        </div>
    )
}

const MaterialGradeTable = () => {
    const dispatch = useDispatch()

    const columns = useMemo(
        () => [
            {
                header: ' Id',
                accessorKey: 'patternId',
                cell: (props) => {
                    const row = props.row.id
                    return (
                        <IdColumn row={row?.id} />
                    )
                }
            },
            {
                header: 'pattern number ',
                accessorKey: 'patternNumber',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center capitalize">
                            {row?.material_grade_number}
                        </div>
                    )
                }
            },
        
        
          
        
            
           
        ],
        []
    )

    const data = useSelector((state) => state.adminMaterialGradeList.data.unitsList)
    const message = useSelector((state) => state.adminMaterialGradeList.data.message)
    const loading = useSelector((state) => state.adminMaterialGradeList.data.loading)
    const { status } = useSelector(
        (state) => state.adminMaterialGradeList.data.filterData
    )

    const { pageIndex, pageSize, query, total } = useSelector(
        (state) => state.adminMaterialGradeList.data.tableData
    )


    const fetchData = useCallback(() => {
        dispatch(getmaterialGrades({ pageIndex, pageSize, query, status }))
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

    return (
        <>
            {message ? <Alert type='info'>
                {message}
            </Alert> :
                <DataTable
                    columns={columns}
                    data={data}
                    skeletonAvatarColumns={[0]}
                    skeletonAvatarProps={{ width: 28, height: 28 }}
                    loading={loading}
                    pagingData={{ pageIndex, pageSize, query, total, status }}
                    onPaginationChange={onPaginationChange}
                    onSelectChange={onSelectChange}
                />
            }
        </>
    )
}

export default MaterialGradeTable;

