import React from 'react'
import { injectReducer } from '../../store'
import { Card } from '../../components/ui'
import EditOrderForm from './components/EditOrderForm';
import shopOwnerListReducer from './store';

injectReducer('adminPoAcceptance', shopOwnerListReducer)


const EditPickups = () => {
    return (
        <div>
            <Card>
                <div className=''>
                    <EditOrderForm />
                </div>
            </Card>
        </div>
    )
}

export default EditPickups