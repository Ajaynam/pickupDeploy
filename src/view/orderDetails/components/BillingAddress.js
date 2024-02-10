import React from 'react'
import { Card } from '../../../components/ui'

const BillingAddress = ({ data = {} }) => {
    return (
        <Card>
            <h4 className="mb-3">Billing Address</h4>
            <ul className="not-italic">
                <li
                    className={`flex items-center justify-between capitalize mb-3`}
                >
                    <span>Village :</span>
                    <span className="font-semibold">
                        {data?.village}
                    </span>
                </li>
                {/* <li
                    className={`flex items-center justify-between capitalize mb-3`}
                >
                    <span>Pincode :</span>
                    <span className="font-semibold">
                        {data?.pincode}
                    </span>
                </li> */}
                <li
                    className={`flex items-center justify-between capitalize mb-3`}
                >
                    <span>Block :</span>
                    <span className="font-semibold">
                        {data?.block}
                    </span>
                </li>
                <li
                    className={`flex items-center justify-between capitalize mb-3`}
                >
                    <span>District</span>
                    <span className="font-semibold">
                        {data?.district}
                    </span>
                </li>
                <li
                    className={`flex items-center justify-between capitalize`}
                >
                    <span>State :</span>
                    <span className="font-semibold">
                        {data?.state}
                    </span>
                </li>
            </ul>
        </Card>
    )
}

export default BillingAddress