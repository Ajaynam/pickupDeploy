import React, { Suspense } from 'react'
import LedgerTable from './components/LedgerTable'
import LedgerTableTools from './components/LedgerTableTools'
import { injectReducer } from '../../store'
import OrderTable from './components/OrderTable'
import OrderTableTools from './components/OrderTableTools'
import ShopProfile from './components/ShopProfile'
import { Loading } from '../../components/shared'
import adminShopDetailReducer from './store';
import { Card } from '../../components/ui'


injectReducer('adminShopDetails', adminShopDetailReducer)


const ShopDetail = () => {
    return (
        <Suspense fallback={<Loading loading={true} />}>
            <div className="md:grid grid-cols-3 gap-3">
                <div className="col-span-2">
                    <Card>
                        <div className='mb-4'>
                            <h5>Shop Ledger</h5>
                        </div>
                        <LedgerTableTools />
                        <LedgerTable />
                    </Card>
                </div>
                <div className="col-span-1">
                    <ShopProfile />
                </div>
            </div>
            <Card className='mt-4'>
                <div className='mb-4'>
                    <h5>Shop Order</h5>
                </div>
                <OrderTableTools />
                <OrderTable />
            </Card>
        </Suspense>
    )
}

export default ShopDetail