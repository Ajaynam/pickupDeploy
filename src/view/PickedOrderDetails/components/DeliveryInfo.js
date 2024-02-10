import React from 'react'
import { Avatar, Card, Button } from '../../../components/ui'
import shippingLogo from './pickupLogo.png'
import { NumberFormatBase } from 'react-number-format'

const DeliveryInfo = ({ data }) => {
   
    return (
        <Card className="mb-4">
            <h5 className="mb-4 text-center">Delivery Details</h5>
            <div className="flex items-center justify-between mb-6">
            <div>
                     
                      <div className="grid  grid-cols-2 p-2">
                        <div className="px-4 py-2 font-semibold"> Name</div>
                        <div className="px-4 py-2">{data.dname}</div>
                        <div className="px-4 py-2 font-semibold">Number</div>
                        <div className="px-4 py-2">{data.dnumber}</div>
                        {data.demail ? <><div className="px-4 py-2 font-semibold">Email</div>
                        <div className="px-4 py-2">{data.demail}</div></> : ""}
                        <div className="px-4 py-2 font-semibold">Address</div>
                        <div className="px-4 py-2">{data.daddress}</div>

                        <div className="px-4 py-2 font-semibold">Reciever Pin</div>
                        <div className="px-4 py-2">{data.dpin}</div>

                        <div className="px-4 py-2 font-semibold">City</div>
                        <div className="px-4 py-2">{data.dcity}</div>

                        <div className="px-4 py-2 font-semibold">State</div>
                        <div className="px-4 py-2">{data.dstate}</div>
                      </div>
                    </div>
                {/* <div className="flex items-center">
                    <Avatar size={60} src={shippingLogo} />
                    <div className="ltr:ml-2 rtl:mr-2">
                        <h6> order Date : {data.orderDate}</h6>
                        <span>
                            Delivery in ~{' '}
                             days
                        </span>
                    </div>
                </div> */}
                {/* <span className="font-semibold">
                    <NumberFormatBase
                        displayType="text"
                        value={(
                            Math.round(data.deliveryFees * 100) / 100
                        ).toFixed(2)}
                        prefix={'$'}
                        thousandSeparator={true}
                    />
                </span> */}
            </div>
            {/* <Button block>View Carrier Details</Button> */}
        </Card>
    )
}

export default DeliveryInfo
