import React from 'react'


import { Card } from '../../components/ui'
import PoMasterListReducer from './store';
import { injectReducer } from '../../store';
import ShopOwnerTableTools from './components/ShopOwnerTableTools';
import PoProductMaster from './components/PoProductMaster';

injectReducer('adminPoMasterList', PoMasterListReducer)
const PoProductMasterList = () => {
    return (
        <div>
            <Card>
                <div className='lg:flex justify-between'>
                    <h4> Pricing List</h4>
                    <ShopOwnerTableTools />
                </div>
                <PoProductMaster />
            </Card>
        </div>
    )
}

export default PoProductMasterList