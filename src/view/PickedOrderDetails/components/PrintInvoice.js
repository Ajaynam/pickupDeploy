// import React, { forwardRef, useEffect, useRef } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import ReactToPrint from 'react-to-print'
// import useQuery from '../../../utils/hooks/useQuery';
// import { ActionLink, Loading } from '../../../components/shared';
// import { Button, Card } from '../../../components/ui';
// import ShopDetails from './InvoiceHeaders';
// import InvoiceTable from './InvoiceTable';
// import { getPoAcceptance } from '../store/dataSlice';
// import isEmpty from 'lodash/isEmpty';
// import StickyFooter from '../../../components/shared/StickyFooter';



// const PrintInvoice = () => {
//     const componentRef = useRef();
//     const query = useQuery()
//     // const data = useSelector(state => state.adminPoAcceptance.data.invoice)
//     // const loading = useSelector(state => state.adminPoAcceptance.data.loading)
//     const orderId = query.get('id')
//     const dispatch = useDispatch()
//     const dummyData = {
//         shop: {
//             // Dummy shop details
//         },
//         items: [
//             {
//                 po_serial_number: 'DUMMY123',
//                 item_code: 'DUMMY001',
//                 drawing_revision_number: 'DUMMY-REV',
//                 po_quantity: 10,
//                 unit_price: 50.0,
//                 net_amount: 500.0,
//             },
//             // Add more dummy items as needed
//         ],
//         bill: {
//             total: 500.0,
//             sGST: 0.05,
//             cGST: 0.05,
//             billamount: 550.0,
//         },
//         status: 'accepted',
//     };

//     const data = dummyData;
//     const loading = false;

//     useEffect(() => {
//         if (orderId) {
//             dispatch(getPoAcceptance({ orderId }))
//         }
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [orderId])

//     return (
//         <div>
//             <Invoices ref={componentRef} />
//             {
//                 loading === false && <StickyFooter
//                     className="-mx-8 px-8 flex items-center justify-end py-4"
//                     stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
//                 >
//                     <div className='flex ml-2 rtl:mr-2 gap-3'>
//                         <ReactToPrint
//                             documentTitle={`#Invoice${data?.id}`}
//                             trigger={() => <div className='flex justify-end'>
//                                 <Button className='mb-4' size='sm' variant='solid'>Print</Button>
//                             </div>}
//                             content={() => componentRef.current}
//                         />
//                     </div>
//                 </StickyFooter>
//             }
//         </div>
//     )
// }

// const Invoices = forwardRef((props, ref) => {

//     const dummyData = {
//         shop: {

//             createdAt: '2023-12-22T17:45:53.000Z',
//             customer_name: 'ABC Supplier',
//             po_number: 'PO123',
//             po_date: '2023-12-14',
//             po_description: 'This is a sample remark',
//             status: 'accepted',

//         },
//         items: [
//             {
//                 po_serial_number: 'DUMMY123',
//                 item_code: 'DUMMY001',
//                 drawing_revision_number: 'DUMMY-REV',
//                 po_quantity: 10,
//                 unit_price: 50.0,
//                 net_amount: 500.0,
//             },
//             // Add more dummy items as needed
//         ],
//         bill: {
//             total: 500.0,
//             billamount: 550.0,
//         },
//         status: 'accepted',
//     };

//     // const data = useSelector(state => state.adminPoAcceptance.data.invoice)
//     // const loading = useSelector(state => state.adminPoAcceptance.data.loading)
//     const data = dummyData;
//     const loading = false;

//     return (
//         isEmpty(data) || loading ? <div className='flex justify-center align-middle h-[100vh]'>
//             <Loading loading={loading}></Loading>
//         </div> :
//             <Card>
//                 <div ref={ref} className='p-5'>
//                     <div className=' mb-4'>
//                         <ShopDetails data={data?.shop} id={data?.orderId} />
//                         <InvoiceTable data={data?.items} bill={data?.bill} status={data?.status} />

//                     </div>


//                     <div className='text-center mt-1 text-xs'>
//                         Developed By <ActionLink href='https://www.5techg.com'>5TechG Lab LLP</ActionLink>
//                         <div className='text-xs'>Contact us: +91 7028828831</div>
//                     </div>
//                     <div className="print:hidden mt-6 flex items-center justify-between">
//                         <small className="italic">
//                             Invoice was created on a computer and is valid
//                             without the signature and seal.
//                         </small>
//                     </div>
//                 </div>
//             </Card>

//     )
// })

// export default PrintInvoice




import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactToPrint from 'react-to-print';
import useQuery from '../../../utils/hooks/useQuery';
import { ActionLink, Container, Loading } from '../../../components/shared';
import { Button, Card, Input, Toast, Notification, Tag } from '../../../components/ui';
import ShopDetails from './InvoiceHeaders';
import InvoiceTable from './InvoiceTable';
import { getPoAcceptance } from '../store/dataSlice';
import isEmpty from 'lodash/isEmpty';
import StickyFooter from '../../../components/shared/StickyFooter';
import { useParams } from 'react-router-dom';
import { AddTrackingId, getUserInformation } from '../store/dataSlice';
import ShippingInfo from './ShippingInfo';
import { HiOutlineCalendar } from 'react-icons/hi';
import classNames from 'classnames';
import dayjs from 'dayjs';
import PickupInfo from './PickupInfo';
import DeliveryInfo from './DeliveryInfo';

const PrintInvoice = () => {
  const componentRef = useRef();
  const dispatch = useDispatch();

  const { userId } = useParams();
  // const dispatch = useDispatch();
  console.log('ID from URL:', userId)

  useEffect(() => {
    dispatch(getUserInformation(userId));
  }, [dispatch, userId]);


  const data = useSelector(state => state.adminPoAcceptance.data.user)
  const loading = useSelector(state => state.adminPoAcceptance.data.loading)
  const user = useSelector((state) => state.adminPoAcceptance.data.user);
  // const loading = useSelector((state) => state.adminuserinformation.loading);
  console.log(user)
  console.log("data ", data)


  return (
    <div>
      <Invoices ref={componentRef} />
      {
        loading === false && <StickyFooter
          className="-mx-8 px-8 flex items-center justify-end py-4"
          stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
        >
          <div className='flex ml-2 rtl:mr-2 gap-3'>
            <Button variant="solid"
              color="yellow-600"
              size='sm'>Edit Details</Button>
            <ReactToPrint
              documentTitle={`#Invoice${data?.id}`}
              trigger={() => <div className='flex justify-end'>
                <Button className='mb-4' size='sm' variant='solid'>Print</Button>
              </div>}
              content={() => componentRef.current}
            />

          </div>

        </StickyFooter>
      }
    </div>
  )
};

const Invoices = forwardRef((props, ref) => {
  const data = useSelector((state) => state.adminPoAcceptance.data.user);
  const loading = useSelector((state) => state.adminPoAcceptance.data.loading);
  const { userId } = useParams();
  const dispatch = useDispatch();
  const [trackingNo, setTrackingNo] = useState("");



  const handleSave = async () => {
    let notificationWithAvatar;
    try {
      await dispatch(AddTrackingId({ userId, trackingNo }));
      setTrackingNo('');
      await dispatch(getUserInformation(userId));
      notificationWithAvatar = (
        <Notification title="njnj">
          {"njn"}
        </Notification>
      );
    } catch (error) {

      notificationWithAvatar = (
        <Notification title="nbj" type="danger">
          {"n "}
        </Notification>
      );
      Toast.push(notificationWithAvatar);
      console.error('Error saving tracking number:', error);
    }
  };


  return (


    <Container className="h-full">
      <Loading loading={loading}>
        {!isEmpty(data) && (
          <>
            <div className='mt-6' ref={ref}>


              <div className="mb-6"  >
                <div className="grid grid-cols-6 items-center mb-2">
                  <h3>
                    <span>Order</span>
                    <span className="ltr:ml-2 ml-2 rtl:mr-2">
                      #{data.orderId}
                    </span>
                  </h3>
                  <div className="bg-gray-100 text-gray-800 ml-4 py-2 px-3 mt-3  rounded shadow-sm">
                    <div className=" text-center py-1">
                      <span className={data.status === "pending" ? "ml-6 text-orange-500 font-bold" : "ml-6 text-green-500 font-bold"}>{data.status}</span>
                    </div>
                  </div>
                  <div className=' col-span-4 mx-auto  flex ml-4 mt-2 '>

                    <div className=''><p className=' font-bold text-[14px]'>  Tracking No.</p>
                      <Input disabled={data.trackingNo ? true : false}
                        value={data.trackingNo ? data.trackingNo : trackingNo}
                        onChange={(e) => setTrackingNo(e.target.value)}
                      />
                    </div>
                    <div className='mt-5 ml-4'>
                      {data.trackingNo ? "" : <Button variant="solid" onClick={handleSave}>
                        Save
                      </Button>}
                    </div>
                  </div>
                </div>

              </div>

              <div className="grid  sm:grid-cols-2 lg:grid-cols-3 md:w-3/12 xl:w-full gap-4">
                <ShippingInfo data={data} />

                <PickupInfo data={data} />

                <DeliveryInfo data={data} />

              </div>


            </div>
          </>
        )}
      </Loading>

    </Container>
  );
});

export default PrintInvoice;
