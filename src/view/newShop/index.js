import React, {lazy, Suspense } from 'react'
import { Container, AdaptableCard } from '../../components/shared'
import adminNewShopReducer from './store'
import { injectReducer } from '../../store'

injectReducer('adminAddShop', adminNewShopReducer)

const ShopInformation = lazy(() =>
    import('./components/ShopInformation'))

const AddShop = () => {
  
  
    return (
        <Container className="h-full">
            <AdaptableCard className="h-full" bodyClass="h-full">

                <Suspense fallback={<></>}>
                    <ShopInformation />
                </Suspense>
            </AdaptableCard>
        </Container>
    )
}

export default AddShop
