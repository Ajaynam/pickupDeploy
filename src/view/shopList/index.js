import React from 'react'
import ShopTable from './components/ShopTable'
import ShopTableTools from './components/ShopTableTools'
import { Card } from '../../components/ui'
import shopListReducer from './store';
import { injectReducer } from '../../store';

injectReducer('adminShopList', shopListReducer)
const ShopList = () => {
    return (
        <div>

            <Card>
                <div className='lg:flex justify-between'>
                    <h4>Shop List</h4>
                    <ShopTableTools />
                </div>
                <ShopTable />
            </Card>
        </div>
    )
}

export default ShopList