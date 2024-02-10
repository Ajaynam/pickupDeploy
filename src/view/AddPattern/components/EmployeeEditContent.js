import React, { forwardRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setDrawerClose } from '../store/stateSlice'
import cloneDeep from 'lodash/cloneDeep'
import isEmpty from 'lodash/isEmpty'
// import { putShopPassword } from '../store/dataSlice'
import EmployeeForm from '../../EmployeeForm'

const EmployeeEditContent = forwardRef((_, ref) => {
    const dispatch = useDispatch()

    const employee = useSelector(
        (state) => state.adminEmployeeList.state.selectedEmployee
    )
    const data = useSelector((state) => state.adminEmployeeList.data.employeeList)
    const { id } = employee

    const onFormSubmit = (values) => {
        const {
            password
        } = values
        let newData = cloneDeep(data)
        let editedShop = {}
       newData.filter((elm) => {
            if (elm.id === id) {
                editedShop = { password: password, id: elm.id }
                return elm
            }
            return elm
        })

        if (!isEmpty(editedShop)) {
            // dispatch(putShopPassword(editedShop))
        }
        dispatch(setDrawerClose())
    }

    return (
        <EmployeeForm
            ref={ref}
            onFormSubmit={onFormSubmit}
            customer={employee}
        />
    )
})

export default EmployeeEditContent
