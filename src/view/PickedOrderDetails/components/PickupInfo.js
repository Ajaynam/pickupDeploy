import React from 'react'
import { Avatar, Card, Button } from '../../../components/ui'
import shippingLogo from './pickupLogo.png'
import { NumberFormatBase } from 'react-number-format'

const PickupInfo = ({ data }) => {

    return (
        <Card className="mb-4">
            <h5 className="mb-4 text-center">Pickup Details</h5>
            <div className="flex items-center justify-between mb-6">
                {/* <div className="flex mr-0 justify-between items-center">
                    <Avatar size={60} src={shippingLogo} />
                    <div className="ltr:ml-2 rtl:mr-2  gap-4 grid grid-cols-2 ">
                        <h6> Name: </h6>
                        <span>
                            {data.pname}
                        </span>
                    </div>
                    <div className="ltr:ml-2 rtl:mr-2 grid grid-cols-2 ">
                        <h6> Name: </h6>
                        <span>
                            {data.pname}
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
                <div >
                      
                      <div className="grid  grid-cols-2  border-r-2 p-2">

                        <div className="px-4 py-2 font-semibold"> Name</div>
                        <div className="px-4 py-2">{data.pname}</div>

                        <div className="px-4 py-2 font-semibold">Number</div>
                        <div className="px-4 py-2">{data.pnumber}</div>

                        {data.pemail ? <><div className="px-4 py-2 font-semibold">Email</div>
                          <div className="px-4 py-2">{data.pemail}</div></> : ""}

                        <div className="px-4 py-2 font-semibold">Address</div>
                        <div className="px-4 py-2">{data.paddress}</div>

                        <div className="px-4 py-2 font-semibold">Pin</div>
                        <div className="px-4 py-2">{data.ppin}</div>

                        <div className="px-4 py-2 font-semibold">City</div>
                        <div className="px-4 py-2">{data.pcity}</div>

                        <div className="px-4 py-2 font-semibold">State</div>
                        <div className="px-4 py-2">{data.pstate}</div>
                      </div>
                    </div>


            </div>
            {/* <Button block>View Carrier Details</Button> */}
        </Card>
    )
}

export default PickupInfo
