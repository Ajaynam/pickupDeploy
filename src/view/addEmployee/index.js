import React, { lazy, Suspense } from 'react'
import { Container, AdaptableCard } from '../../components/shared'
import { injectReducer } from '../../store'
import { Card } from '../../components/ui'
import addEmployeeReducer from './store'

injectReducer('addEmployee', addEmployeeReducer)

const PersonalInformation = lazy(() =>
    import('./components/PersonalInformation'))

const AddEmployee = () => {
    return (
        <Suspense fallback={<></>}>
            <Card>
                <PersonalInformation />
            </Card>
        </Suspense>
    )
}

export default AddEmployee
