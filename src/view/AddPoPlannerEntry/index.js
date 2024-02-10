import React, { lazy, Suspense, useState } from 'react'
import { Container, AdaptableCard } from '../../components/shared'
import { injectReducer } from '../../store'
import adminAddOwnerReducer from './store';
import PoOrderTable from '../PoAcceptanceTemplate/components/PoOrderTable';


injectReducer('adminNewOwner', adminAddOwnerReducer)

const PersonalInformation = lazy(() =>
    import('./components/PersonalInformation'))

const AddOwner = () => {
    const [tableData, setTableData] = useState([]);
    const handleFormSubmit = (values) => {
        // Update the tableData state with the form values
        setTableData((prevTableData) => [...prevTableData, values]);
    };

    return (
        <Container className="h-full">
            <AdaptableCard className="h-full" bodyClass="h-full">

                <Suspense fallback={<></>}>
                    <PersonalInformation onSubmit={handleFormSubmit} />
                    <div className=' mt-10'>
                        <PoOrderTable tableData={tableData} />
                    </div>
                </Suspense>
            </AdaptableCard>
        </Container>
    )
}

export default AddOwner
