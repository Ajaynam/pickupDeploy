import dayjs from 'dayjs'
import React from 'react'
import logoBrother from './logoBrother.png'
import './PurchaseOrder.css'
const ShopDetails = ({ data, id ,status }) => {

    const dummyData = data;

    const orderStatusColor = {
        accepted: {
            label: 'accepted',
            dotClass: 'bg-emerald-500',
            textClass: 'text-emerald-500',
        },
        pending: {
            label: 'Pending',
            dotClass: 'bg-amber-500',
            textClass: 'text-amber-500',
        },
        cancel: {
            label: 'Cancel',
            dotClass: 'bg-red-500',
            textClass: 'text-red-500',
        },
        rejected: {
            label: 'Rejected',
            dotClass: 'bg-red-500',
            textClass: 'text-red-500',
        },
    }

    return (

        <div className="purchase-order-confirmation ">
            <div className="company-info grid grid-cols-2">
                <img src={logoBrother} alt="Company Logo" className="company-logo col-span-1" />
                <div className="company-address col-span-1 ">
                    <h5>Invoice #{id}</h5>
                    <div>
                        <span className='font-semibold'>
                            Date :
                        </span>
                        <span>{' '}</span>
                        <span> {dayjs(data?.createDate)
                            .format('dddd, DD MMMM, YYYY')}</span>
                    </div>
                    <strong> <p>Brothers Indrusties</p></strong>

                    <p>Dr PK Industrial Estate, Tal:- Palus, Dist:- Sangli, Maharastra</p>

                    <p>Phone: (123) 456-7890</p>
                </div>
            </div>
            <div className='border '></div>
            <div className="company-info pt-2 grid grid-cols-2">
                <div className=" col-span-1 ">
                    <p>    <strong>Customer/Supplier Name :</strong>  {dummyData.customer_name}</p>
                    <p>    <strong>PO Number :</strong> {dummyData.po_number}</p>
                    <p>    <strong>PO Date :</strong>{dummyData.po_date}</p>
                </div>
                <div className=" col-span-1 ">
                    <p><strong>Delivery Terms :</strong> {dummyData.po_description}</p>
                    <p className='print:hidden'><strong> Order Status :</strong> <span
                            className={`capitalize font-semibold ${orderStatusColor[dummyData.status]?.textClass}`}
                        >
                            {orderStatusColor[dummyData.status]?.label}
                        </span></p>
                   
                </div>
            </div>

            <div className=" bg-lime-50">
                <div className='border '></div>
                <h4 className='text-center p-1'>Purchase Order Confirmation</h4>
                <div className='border'></div>
            </div>

        </div>
    )
}

export default ShopDetails