import React from 'react'


import { Card } from '../../components/ui'
import shopOwnerListReducer from './store';
import { injectReducer } from '../../store';
import ShopOwnerTable from './components/ShopOwnerTable';
import ShopOwnerTableTools from './components/ShopOwnerTableTools';



injectReducer('adminShopOwnerList', shopOwnerListReducer)
const ShopList = () => {
    return (
        <div>
            <Card>
                <div className='lg:flex justify-between'>
                    <h4>Shop Owner List</h4>
                    <ShopOwnerTableTools />
                </div>
                <ShopOwnerTable />
            </Card>
        </div>
    )
}

export default ShopList