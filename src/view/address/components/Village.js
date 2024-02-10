import React from 'react'
import AddressTable from './AddressTable'
import { Card, Notification, Toast } from '../../../components/ui'
import isEmpty from 'lodash/isEmpty';
import { useDispatch, useSelector } from 'react-redux';
import { addVillage, getAllVillageByBlockId } from '../store/dataSlice';
import { Loading } from '../../../components/shared';

const Village = () => {
    const dispatch = useDispatch()

    const villageData = useSelector(state => state.address.data.villageList)
    const blockId = useSelector((state) => state.address.state.blockId);

    const loading = useSelector(state => state.address.data.villageLoading)
    const onFetchVillageClick = (value) => {
        // dispatch(getAllDistrictByStateId({ stateId: value }))
    }

    const handleAddVillage = async (data) => {
        const addData = { ...data, blockId: blockId }
        const action = await dispatch(addVillage(addData))
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
            dispatch(getAllVillageByBlockId({ blockId: blockId }))

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
            <Loading loading={loading} >
                {
                    !isEmpty(villageData) && <Card>
                        <span className='mb-6'>
                            <h5>Village list</h5>
                        </span>
                        <AddressTable onFormSubmit={handleAddVillage} data={villageData} loading={loading} onNext={onFetchVillageClick} click={false} />
                    </Card>
                }
            </Loading>
        </>
    )
}

export default Village