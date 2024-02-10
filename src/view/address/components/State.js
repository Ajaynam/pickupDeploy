import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addState, getAllDistrictByStateId, getAllState } from '../store/dataSlice'
import AddressTable from './AddressTable'
import isEmpty from 'lodash/isEmpty';
import { Card, Notification, Toast } from '../../../components/ui';
import { setStateId } from '../store/stateSlice';
import AddAddressDialog from './AddAddressDialog';
import { Loading } from '../../../components/shared';

const State = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllState())
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const data = useSelector(state => state.address.data.stateList)
    const loading = useSelector(state => state.address.data.stateLoading)
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
        const action = await dispatch(getAllDistrictByStateId({ stateId: value }));
        if (action.payload.data.data.length === 0) {
            setIsOpen(true)
        }
        dispatch(setStateId(value))
    }


    const handleAddState = async (data) => {

        const action = await dispatch(addState(data))
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

            dispatch(getAllState())
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
            {dialogIsOpen && <AddAddressDialog item={'state'} dialogIsOpen={dialogIsOpen} openDialog={openDialog} onDialogClose={onDialogClose} onDialogOk={onDialogOk} />}
            <Loading loading={loading}>
                {
                    !isEmpty(data) && <Card>
                        <span className='mb-6'>
                            <h5>State list</h5>
                        </span>
                        <AddressTable onFormSubmit={handleAddState} data={data} loading={loading} onNext={onFetchDistrictClick} click={true} />
                    </Card>
                }
            </Loading>
        </>
    )
}

export default State