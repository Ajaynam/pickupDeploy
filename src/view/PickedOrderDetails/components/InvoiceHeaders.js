import dayjs from 'dayjs'
import React from 'react'
import logoBrother from './pickupLogo.png'
import './PurchaseOrder.css'
const ShopDetails = ({ data, id ,status }) => {

    const orderData = data;
console.log(" orderdata" ,orderData)
    const orderStatusColor = {
        accepted: {
            label: 'picked-up',
            dotClass: 'bg-emerald-500',
            textClass: 'text-emerald-500',
        },
        pending: {
            label: 'Pending',
            dotClass: 'bg-amber-500',
            textClass: 'text-amber-500',
        },
       
    }

    return (

        <div className="purchase-order-confirmation ">
            <div className="company-info grid grid-cols-2">
                <img src={logoBrother} alt="Company Logo" className="company-logo col-span-1" />
                <div className="company-address col-span-1 ">
                    <p className='text-xl text-black'> <strong>OrderId :</strong> #{orderData.orderId}</p>
                    <div>
                        <span className='font-semibold'>
                            Date :
                        </span>
                        <span>{' '}</span>
                        <span> {dayjs(data?.createDate)
                            .format('dddd, DD MMMM, YYYY')}</span>
                    </div>
                    {/* <strong> <p>Brothers Indrusties</p></strong>

                    <p>Dr PK Industrial Estate, Tal:- Palus, Dist:- Sangli, Maharastra</p>

                    <p>Phone: (123) 456-7890</p> */}
                </div>
            </div>
            <div className='border '></div>
            {/* <div className="company-info pt-2 grid grid-cols-2">
                <div className=" col-span-1 ">
                    <p>    <strong>Pickup Details :</strong>  </p>
                    <p>    <strong>PO Number :</strong> </p>
                    <p>    <strong>PO Date :</strong></p>
                </div>
                <div className=" col-span-1 ">
                    <p><strong>Delivery Terms :</strong> </p>
                    <p className='print:hidden'><strong> Order Status :</strong> <span
                            className={`capitalize font-semibold ${orderStatusColor[orderData.status]?.textClass}`}
                        >
                            {orderStatusColor[orderData.status]?.label}
                        </span></p>
                   
                </div>
            </div> */}

            {/* <div className=" bg-lime-50">
                <div className='border '></div>
                <h4 className='text-center p-1'>Purchase Order Confirmation</h4>
                <div className='border'></div>
            </div> */}

        </div>
    )
}

export default ShopDetails