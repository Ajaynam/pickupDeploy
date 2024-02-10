import React, { Suspense } from 'react'
import adminInvoiceReducer from './store'
import PrintInvoice from './components/PrintInvoice'
import { injectReducer } from '../../store'
import { Loading } from '../../components/shared'
import { useSelector } from 'react-redux'
injectReducer('adminPoAcceptance', adminInvoiceReducer)


const Invoices = () => {
    // const loading = useSelector(state => state.adminInvoice.data.loading)
    // console.log(loading);
    return (
        <PrintInvoice />
    )
}

export default Invoices