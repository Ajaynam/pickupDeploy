import React from 'react'
import { Avatar, Card, Button } from '../../../components/ui'
import shippingLogo from './pickupLogo.png'
import { NumberFormatBase } from 'react-number-format'

const ShippingInfo = ({ data }) => {

    return (
        <Card className="mb-2 bg-red-50">
            <h5 className="mb-4 text-center">Package Details</h5>
            <div className="flex items-center justify-between mb-6">

                <div className=" ">
                    <div className="  p-3 pt-0 border-t-4 border-green-400">

                        <div className="grid grid-cols-2">
                            <div className="px-4 py-2 font-semibold">Package Type</div>
                            <div className="px-4 py-2">{data.packageType}</div>
                        </div>
                        <div className="grid grid-cols-2">
                            <div className="px-4 py-2 font-semibold">Actual Weight</div>
                            <div className="px-4 py-2">{data.weight} </div>
                        </div>
                        <div className="grid grid-cols-2">
                            {data.ChargableWeight ? <div className="px-4 py-2 font-semibold">Chargable Weight</div> : ""}
                            <div className="px-4 py-2">{data.ChargableWeight} </div>
                        </div>
                        <div className="grid grid-cols-2">
                            <div className="px-4 py-2 font-semibold">Ship Type</div>
                            <div className="px-4 py-2">{data.shiptype}</div>
                        </div>

                        <div className="grid grid-cols-2">
                            <div className="px-4 py-2 font-semibold">Order Date</div>
                            <div className="px-4 py-2">{data.orderDate}</div>
                        </div>
                        <div className="grid grid-cols-2">
                            <div className="px-4 py-2 font-semibold">Tracking No.</div>
                            <div className="px-4 py-2">{data.trackingNo}</div>
                        </div>


                        {/* <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">tracking No</div>
                  <div className="px-4 py-2">{data.trackingNo}</div>
                </div> */}
                    </div>
                </div>
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
            <div className='border'></div>
            <div className="grid grid-cols-2">
                <div className="px-4 py-2 text-xl font-semibold">Amount :</div>
                <div className="px-4 text-xl py-2">₹ {data.price}</div>
            </div>

            {/* <Button block>View Carrier Details</Button> */}
        </Card>
    )
}

export default ShippingInfo
