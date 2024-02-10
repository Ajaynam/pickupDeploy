import React, { lazy, Suspense } from 'react'
import { Container, AdaptableCard } from '../../components/shared'
import { injectReducer } from '../../store'
import adminAddOwnerReducer from './store';

injectReducer('adminNewOwner', adminAddOwnerReducer)

const PersonalInformation = lazy(() =>
    import('./components/PersonalInformation'))

const AddOwner = () => {
    return (
        <Container className="h-full">
            <AdaptableCard className="h-full" bodyClass="h-full">

                <Suspense fallback={<></>}>
                    <PersonalInformation />
                </Suspense>
            </AdaptableCard>
        </Container>
    )
}

export default AddOwner
