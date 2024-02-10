import React from 'react'
import { Card } from '../../../components/ui'
import { NumericFormat } from 'react-number-format'
// import NumberFormat from 'react-number-format'

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
                    value={(Math.round(value * 100) / 100).toFixed(2)}
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
                    value={(Math.round(value * 100) / 100).toFixed(2)}
                    prefix={'+ ₹'}
                    thousandSeparator={true}
                    thousandsGroupStyle='lakh'
                />
            </span>
        </li>
    )
}

const PaymentSummary = ({ bill }) => {
    return (
        <Card className="mb-4">
            <h5 className="mb-4">Payment Summary</h5>
            <ul>
                <PaymentInfo label="Subtotal" value={bill?.subtotal} />
                {/* <PaymentInfo label="Delivery fee" value={data.deliveryFees} /> */}

                <PaymentInfoGST label={`SGST(${bill?.sGST.toFixed(2) * 100}%)`} value={Math.round(bill?.sGST * bill?.subtotal)} />
                <PaymentInfoGST label={`CGST(${bill?.cGST.toFixed(2) * 100}%)`} value={Math.round(bill?.cGST * bill?.subtotal)} />
                <hr className="mb-2" />
                <PaymentInfo label="Grant total" value={Number(bill?.billamount).toFixed(2)} isLast />
            </ul>
        </Card>
    )
}

export default PaymentSummary
