import React from 'react'
import { AdaptableCard } from '../../components/shared'
import OrdersTable from './components/OrdersTable'
import { injectReducer } from '../../store'
import adminOrderListReducer from './store';
import OrdersTableTools from './components/OrdersTableTools';


injectReducer('adminOrderList', adminOrderListReducer)
const OrderList = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-end mb-4">
                <OrdersTableTools />
            </div>
            <OrdersTable />
            {/* <OrderDeleteConfirmation /> */}
        </AdaptableCard>
    )
}

export default OrderList
