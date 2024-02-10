import React, { useEffect, useMemo } from 'react'
import { NumericFormat } from 'react-number-format'
import { useDispatch, useSelector } from 'react-redux'
import { setGST } from '../store/stateSlice'

const PaymentInfo = ({ label, value, isLast }) => {
    return (
        <li
            className={`flex items-center justify-between${!isLast ? ' mb-3' : ''
                }`}
        >
            <span>{label}</span>
            <span className="font-semibold">
                <NumericFormat
                    displayType="text"
                    value={value}
                    prefix={'₹'}
                    thousandSeparator={true}
                    thousandsGroupStyle='lakh'
                />
            </span>
        </li>
    )
}
const PaymentInfoGST = ({ label, value, isLast }) => {
    return (
        <li
            className={`flex items-center justify-between${!isLast ? ' mb-3' : ''
                }`}
        >
            <span>{label}</span>
            <span className="font-semibold">
                <NumericFormat
                    displayType="text"
                    value={value}
                    prefix={'+ ₹'}
                    thousandSeparator={true}
                    thousandsGroupStyle='lakh'
                />
            </span>
        </li>
    )
}

const PaymentSummary = ({ values }) => {
    const dispatch = useDispatch()
    let cGST = values?.gst ? .09 : 0
    let sGST = values?.gst ? .09 : 0

    useEffect(() => {
dispatch(setGST({cGST, sGST}))
    }, [values?.gst])


    const product = useSelector(state => state.adminNewOrder.state.selectedProductNameList)
    const quantity = useSelector(state => state.adminNewOrder.state.selectedQuantity)
    const price = useSelector(state => state.adminNewOrder.state.selectedPrice)
    const category = useSelector(state => state.adminNewOrder.state.selectedCategory)


    function subtotal(price, quantity) {
        return quantity.map((item, index) => item * price[index]).reduce((sum, i) => sum + i, 0);
    }

    const invoiceSubtotal = useMemo(() => {
        return subtotal(price, quantity)
    }, [product, quantity, price, category])


    const invoiceTaxesCGST = Math.round(cGST * invoiceSubtotal).toFixed(2);
    const invoiceTaxesSGST = Math.round(sGST * invoiceSubtotal).toFixed(2);
    const invoiceTotal = Math.round((Math.round(cGST * invoiceSubtotal) + Math.round(sGST * invoiceSubtotal)) + invoiceSubtotal).toFixed(2);

    return (
        <>
            <h5 className="mb-4">Payment Summary</h5>
            <ul>
                <PaymentInfo label="Subtotal" value={Math.round(invoiceSubtotal).toFixed(2)} />
                {/* <PaymentInfo label="Delivery fee" value={data.deliveryFees} /> */}

                <hr className="mb-3" />
                {/* <PaymentInfoGST label={`SGST(${sGST.toFixed(2) * 100}%)`} value={invoiceTaxesSGST} /> */}
                {/* <PaymentInfoGST label={`CGST(${cGST.toFixed(2) * 100}%)`} value={invoiceTaxesCGST} /> */}
                {/* <hr className="mb-3" />
                <PaymentInfo label={`IGST(${TAX_RATE.toFixed(2) * 100}%)`} value={invoiceTaxes} /> */}
                <hr className="mb-3" />
                <PaymentInfo label="Total" value={invoiceTotal} isLast />
            </ul>
        </>
    )
}

export default PaymentSummary
