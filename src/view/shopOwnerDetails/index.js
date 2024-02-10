import React, { Suspense } from 'react'
import { Card } from '../../components/ui'
import { Loading } from '../../components/shared'
import EmployeeProfile from './components/shopOwnerProfile'
import ShopTable from './components/ShopTable'
import ShopTableTools from './components/ShopTableTools'

import { injectReducer } from '../../store'

import { useSelector } from 'react-redux'
import adminOwnerDetailReducer from './store'


injectReducer('adminOwnerDetails', adminOwnerDetailReducer)




const EmployeeDetails = () => {

    const loading = useSelector(state => state.adminOwnerDetails.data.loading)
    const shopLoading = useSelector(state => state.adminOwnerDetails.data.shopLoading)

    return (
        <Suspense fallback={<Loading loading={true} />}>
            {
                (loading && shopLoading) ? <Loading loading={true} /> : <>
                    <div className="md:grid grid-cols-3 gap-3 mb-8">
                        <div className="col-span-2">
                            {/* <Card>
                                <LedgerTableTools />
                                <LedgerTable />
                            </Card> */}
                            <Card>
                                <ShopTableTools />
                                <ShopTable />
                            </Card>

                        </div>
                        <div className="col-span-1">
                            <EmployeeProfile />
                        </div>
                    </div>
                    {/* <div >

                        <Card>
                            <ShopTableTools />
                            <ShopTable />
                        </Card>


                    </div> */}
                </>
            }
        </Suspense>
    )
}

export default EmployeeDetails