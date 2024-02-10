import React  from 'react'
import PurchaseOrderConfirmation from './components/PurchaseOrderConfirmation';
import adminAdddNewPoEntryReducer from './store';
import { injectReducer } from '../../store';

injectReducer('adminNewPoEntry', adminAdddNewPoEntryReducer)


function PoAcceptanceTemplate() {
    
      return (
        <div className="app">
          {/* Your other components and content */}
          <PurchaseOrderConfirmation  />

          
        </div>
      );
}

export default PoAcceptanceTemplate