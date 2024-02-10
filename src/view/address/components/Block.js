import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addBlock, getAllBlockByDistrictId, getAllVillageByBlockId } from '../store/dataSlice'
import AddressTable from './AddressTable'
import isEmpty from 'lodash/isEmpty';
import { Card, Notification, Toast } from '../../../components/ui';
import { setBlockId } from '../store/stateSlice';
import AddAddressDialog from './AddAddressDialog';
import { Loading } from '../../../components/shared';

const Block = () => {
    const dispatch = useDispatch()

    const blockData = useSelector(state => state.address.data.blockList)
    const districtId = useSelector((state) => state.address.state.districtId);

    const loading = useSelector(state => state.address.data.blockLoading)
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
    const onFetchBlockClick = async (value) => {
        const action = await dispatch(getAllVillageByBlockId({ blockId: value }));
        if (action.payload.data.data.length === 0) {
            setIsOpen(true)
        }
        dispatch(setBlockId(value))
    }

    const handleAddBlock = async (data) => {
        const addData = { ...data, districtId: districtId }

        const action = await dispatch(addBlock(addData))
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
            dispatch(getAllBlockByDistrictId({ districtId: districtId }))

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
            {dialogIsOpen && <AddAddressDialog formType='block' item={'block'} dialogIsOpen={dialogIsOpen} openDialog={openDialog} onDialogClose={onDialogClose} onDialogOk={onDialogOk} />}

            <Loading loading={loading}>
                {
                    !isEmpty(blockData) && <Card>
                        <span className='mb-6'>
                            <h5>Block list</h5>
                        </span>
                        <AddressTable onFormSubmit={handleAddBlock} data={blockData} loading={loading} onNext={onFetchBlockClick} click={true} />
                    </Card>
                }
            </Loading>
        </>
    )
}

export default Block