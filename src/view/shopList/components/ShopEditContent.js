import React, { forwardRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setDrawerClose } from '../store/stateSlice'
import cloneDeep from 'lodash/cloneDeep'
import isEmpty from 'lodash/isEmpty'
import ShopForm from '../../ShopForm'
import { putShopPassword } from '../store/dataSlice'
import { Notification, Toast } from '../../../components/ui'

const ShopEditContent = forwardRef((_, ref) => {
    const dispatch = useDispatch()

    const shop = useSelector(
        (state) => state.adminShopList.state.selectedShop
    )
    const data = useSelector((state) => state.adminShopList.data.shopList)
    const { id } = shop

    const onFormSubmit = async (values) => {
        console.log(values);
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
            const action = await dispatch(putShopPassword(editedShop))
            if (action?.payload?.status < 300) {
                const notification = (
                    <Notification
                        title={<span className='capitalize'>Password change successfully</span>}
                        type='success'
                    >
                    </Notification>
                )
                Toast.push(notification)
                dispatch(setDrawerClose())
                return
            } else {
                const notification = (
                    <Notification
                        title={<span className='capitalize'>Password change unsuccessful</span>}
                        type='danger'
                    >
                    </Notification>
                )
                Toast.push(notification)
            }
        }
    }

    return (
        <ShopForm
            ref={ref}
            onFormSubmit={onFormSubmit}
            customer={shop}
        />
    )
})

export default ShopEditContent
