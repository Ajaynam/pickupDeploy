import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addDistrict, getAllBlockByDistrictId, getAllDistrictByStateId } from '../store/dataSlice'
import AddressTable from './AddressTable'
import isEmpty from 'lodash/isEmpty';
import { Card, Notification, Toast } from '../../../components/ui';
import { Loading } from '../../../components/shared';
import { setDistrictId } from '../store/stateSlice';
import AddAddressDialog from './AddAddressDialog';

const District = () => {
    const dispatch = useDispatch()
    const districtsData = useSelector(state => state.address.data.districtList)
    const stateId = useSelector((state) => state.address.state.stateId);

    const loading = useSelector(state => state.address.data.districtLoading)
    const [dialogIsOpen, setIsOpen] = useState(false)

    const openDialog = () => {
        setIsOpen(true)
    }

    const onDialogClose = (e) => {
        setIsOpen(false)
    }

    const onDialogOk = (e) => {
        setIsOpen(false)
    }

    const onFetchDistrictClick = async (value) => {
        const action = await dispatch(getAllBlockByDistrictId({ districtId: value }))
        if (action.payload.data.data.length === 0) {
            setIsOpen(true)
        }
        dispatch(setDistrictId(value))
    }

    const handleAddDistrict = async (data) => {
        const addData = { ...data, stateId: stateId }

        const action = await dispatch(addDistrict(addData))
        let notificationWithAvatar;

        if (action?.payload?.status < 400) {
            notificationWithAvatar = (
                <Notification
                    title={'Successfully added'}
                    type='success'
                >
                    {action?.payload?.data?.message}
                </Notification>
            )
            dispatch(getAllDistrictByStateId({ stateId: stateId }))

        } else {
            notificationWithAvatar = (
                <Notification
                    title={'Error'}
                    type='danger'
                >
                    {action?.payload?.data?.message}
                </Notification>
            )
        }
        Toast.push(notificationWithAvatar)
    }


    return (
        <>
            {dialogIsOpen && <AddAddressDialog item={'district'} dialogIsOpen={dialogIsOpen} openDialog={openDialog} onDialogClose={onDialogClose} onDialogOk={onDialogOk} />}
            <Loading loading={loading}>
                {
                    loading ? <Card>
                        <span className='mb-6'>
                            <h5>District list</h5>
                        </span>
                        <AddressTable data={districtsData} loading={loading} onNext={onFetchDistrictClick} click={true} />
                    </Card> : !isEmpty(districtsData) && <Card>
                        <span className='mb-6'>
                            <h5>District list</h5>
                        </span>
                        <AddressTable onFormSubmit={handleAddDistrict} data={districtsData} loading={loading} onNext={onFetchDistrictClick} click={true} />

                    </Card>
                }
            </Loading>
        </>
    )
}

export default District