import React, { Suspense } from 'react'
import { Card } from '../../components/ui'
import { Loading } from '../../components/shared'
import Overview from './components/Overview'
import EmployeeProfile from './components/EmployeeProfile'
import ShopTable from './components/ShopTable'
import ShopTableTools from './components/ShopTableTools'
import adminEmployeeDetailReducer from './store'
import { injectReducer } from '../../store'
import LedgerTable from './components/LedgerTable'
import LedgerTableTools from './components/LedgerTableTools'
import VillageTable from './components/VillageTable'
import { useSelector } from 'react-redux'


injectReducer('adminEmployeeDetails', adminEmployeeDetailReducer)




const EmployeeDetails = () => {
    
    const villageLoading = useSelector(state => state.adminEmployeeDetails.data.villageLoading)
    const loading = useSelector(state => state.adminEmployeeDetails.data.loading)
    const shopLoading = useSelector(state => state.adminEmployeeDetails.data.shopLoading)
    const profileLoading = useSelector(state => state.adminEmployeeDetails.data.profileLoading)

    return (
        <Suspense fallback={<Loading loading={true} />}>
            {
                (loading && shopLoading) ? <Loading loading={true} /> : <>
                    <div className="md:grid grid-cols-3 gap-3 mb-8">
                        <div className="col-span-2">
                            <Card>
                                <LedgerTableTools />
                                <LedgerTable />
                            </Card>
                        </div>
                        <div className="col-span-1">
                            <EmployeeProfile />
                        </div>
                    </div>
                    <div className="md:grid grid-cols-3 gap-3">
                        <div className="col-span-2">
                            <Card>
                                <ShopTableTools />
                                <ShopTable />
                            </Card>
                        </div>
                        <div className="col-span-1">
                            <VillageTable />
                        </div>
                    </div>
                </>
            }
        </Suspense>
    )
}

export default EmployeeDetails