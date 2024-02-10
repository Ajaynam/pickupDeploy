import React from 'react'
import ProductTable from './components/ProductTable'
import { AdaptableCard } from '../../components/shared'
import { injectReducer } from '../../store'
import productListReducer from './store'
import { Card } from '../../components/ui'
import ProductTableTools from './components/ProductTableTools'


injectReducer('productList', productListReducer)
const ProductList = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">

            <Card>
                <div className='mb-6 lg:flex justify-between'>
                    <h5>Product list</h5>
                    <ProductTableTools />
                </div>
                <ProductTable />
            </Card>
            {/* <OrderDeleteConfirmation /> */}
        </AdaptableCard>
    )
}

export default ProductList