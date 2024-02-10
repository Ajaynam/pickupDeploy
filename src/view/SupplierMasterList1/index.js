import React from 'react'


import { Card } from '../../components/ui'
import shopOwnerListReducer1 from './store';
import { injectReducer } from '../../store';
import ShopOwnerTable from './components/ShopOwnerTable';
import ShopOwnerTableTools from './components/ShopOwnerTableTools';
// import OrderDeleteConfirmation from './components/OrderDeleteConfirmation';

injectReducer('adminShopOwnerList1', shopOwnerListReducer1)
const ShopList = () => {
    return (
        <div>
            <Card>
                <div className='lg:flex justify-between'>
                    <h4>Quick Order List</h4>
                    {/* <ShopOwnerTableTools /> */}
                </div>
                <ShopOwnerTable />
                {/* <OrderDeleteConfirmation/> */}
            </Card>
        </div>
    )
}

export default ShopList