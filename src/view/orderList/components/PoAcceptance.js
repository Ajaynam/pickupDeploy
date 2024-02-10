// PurchaseOrderConfirmation.js

import React  ,{useCallback} from 'react';
import './PurchaseOrder.css'
import logoBrother from './logoBrother.png'
import { Button } from '../../../components/ui';
import { StickyFooter } from '../../../components/shared';
import { HiOutlinePencil, HiPrinter } from 'react-icons/hi';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import PoOrderTable from '../../PoAcceptanceTemplate/components/PoOrderTable';
const PurchaseOrderConfirmation = ({ orderDetails }) => {
    const navigate = useNavigate()
    const handleAccept = () => {
        // Implement your logic for accepting the purchase order
        console.log('Purchase Order Accepted');
    };

    const onEdit = useCallback(() => {
        // navigate(`/PoAcceptance/List?id=${row.orderId}`)
        navigate(`/PoPlannerEntry/new`)
    }, [navigate])

    const handleReject = () => {
        // Implement your logic for rejecting the purchase order
        console.log('Purchase Order Rejected');
    };
    return (
        <div >
            <div className="purchase-order-confirmation ">
                <div className="company-info grid grid-cols-2">
                    <img src={logoBrother} alt="Company Logo" className="company-logo col-span-1" />
                    <div className="company-address col-span-1 ">
                        <strong> <p>Brothers Indrusties</p></strong>

                        <p>Dr PK Industrial Estate, Tal:- Palus, Dist:- Sangli, Maharastra</p>

                        <p>Phone: (123) 456-7890</p>
                    </div>
                </div>
                <div className='border '></div>
                <div className="company-info pt-2 grid grid-cols-2">
                    <div className=" col-span-1 ">
                        <p>    <strong>Customer/Supplier Name :</strong></p>
                        <p>    <strong>PO Number :</strong></p>
                        <p>    <strong>PO Date :</strong></p>
                    </div>
                    <div className=" col-span-1 ">
                        <p><strong>Order Acceptance Number :</strong> </p>
                        <p><strong>Brothers Remark :</strong> </p>
                        <p><strong>Status :</strong> </p>
                    </div>
                </div>

                <div className=" bg-lime-50">
                    <div className='border '></div>
                    <h4 className='text-center p-1'>Purchase Order Confirmation</h4>
                    <div className='border'></div>
                </div>
                <div className='mt-10'>
                    <PoOrderTable />
                </div>
                <div className='border mt-4 '></div>
                <div className='grid grid-cols-2 p-4 '>
                    <div>
                        <p><strong>TERM & CONDITION: </strong></p>
                    </div>
                    <div>
                        <p><strong> Sub Total: </strong></p>
                    </div>
                </div>
                <div className='border  '></div>

                <div>
                    <p className="thank-you-message">Thank you for your purchase!</p>
                </div>

            </div>

            <div className='  mt-6 '>

                {/* <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                onClick={handleAccept}
            >
                Accept
            </button>


            <button
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={handleReject}
            >
                Reject
            </button> */}

                <StickyFooter
                    className="-mx-8 px-8 flex items-center justify-between py-4"
                    stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                >
                   <div className='flex ml-2 ltr:ml-2 gap-3'>
                    <Button className="mr-2" icon={<HiPrinter /> }   >
                            Print
                        </Button>
                       
                    </div>
                   
                </StickyFooter>
            </div>
        </div>
    );
};

export default PurchaseOrderConfirmation;
