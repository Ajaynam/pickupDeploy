import React, { lazy, Suspense } from 'react'
import { Container, AdaptableCard } from '../../components/shared'
import { injectReducer } from '../../store'
import adminAddOwnerReducer from './store';
// import PickupMode from './AddSupplierMaster/AddNewOrder';

injectReducer('adminNewOwner', adminAddOwnerReducer)

const PickupMode = lazy(() =>
    import('./AddSupplierMaster/AddNewOrder'))

const AddOwner = () => {
    return (
        <Container className="h-full">
            <AdaptableCard className="h-full" bodyClass="h-full">

                <Suspense fallback={<></>}>
                    <PickupMode />
                </Suspense>
            </AdaptableCard>
        </Container>
    )
}

export default AddOwner
