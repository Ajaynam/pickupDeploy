import React, { forwardRef, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ReactToPrint from 'react-to-print'
import useQuery from '../../../utils/hooks/useQuery';
import { ActionLink, Loading } from '../../../components/shared';
import { Button, Card } from '../../../components/ui';
import ShopDetails from './InvoiceHeaders';
import InvoiceTable from './InvoiceTable';
import { getPoAcceptance } from '../store/dataSlice';
import isEmpty from 'lodash/isEmpty';
import StickyFooter from '../../../components/shared/StickyFooter';



const PrintInvoice = () => {
    const componentRef = useRef();
    const query = useQuery()
    // const data = useSelector(state => state.adminPoAcceptance.data.invoice)
    // const loading = useSelector(state => state.adminPoAcceptance.data.loading)
    const orderId = query.get('id')
    const dispatch = useDispatch()
    const dummyData = {
        shop: {
            // Dummy shop details
        },
        items: [
            {
                po_serial_number: 'DUMMY123',
                item_code: 'DUMMY001',
                drawing_revision_number: 'DUMMY-REV',
                po_quantity: 10,
                unit_price: 50.0,
                net_amount: 500.0,
            },
            // Add more dummy items as needed
        ],
        bill: {
            total: 500.0,
            sGST: 0.05,
            cGST: 0.05,
            billamount: 550.0,
        },
        status: 'accepted',
    };

    const data = dummyData;
    const loading = false;

    useEffect(() => {
        if (orderId) {
            dispatch(getPoAcceptance({ orderId }))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orderId])

    return (
        <div>
            <Invoices ref={componentRef} />
            {
                loading === false && <StickyFooter
                    className="-mx-8 px-8 flex items-center justify-end py-4"
                    stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                >
                    <div className='flex ml-2 rtl:mr-2 gap-3'>
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
}

const Invoices = forwardRef((props, ref) => {

    const dummyData = {
        shop: {

            createdAt: '2023-12-22T17:45:53.000Z',
            customer_name: 'ABC Supplier',
            po_number: 'PO123',
            po_date: '2023-12-14',
            po_description: 'This is a sample remark',
            status: 'accepted',

        },
        items: [
            {
                po_serial_number: 'DUMMY123',
                item_code: 'DUMMY001',
                drawing_revision_number: 'DUMMY-REV',
                po_quantity: 10,
                unit_price: 50.0,
                net_amount: 500.0,
            },
            // Add more dummy items as needed
        ],
        bill: {
            total: 500.0,
            billamount: 550.0,
        },
        status: 'accepted',
    };

    // const data = useSelector(state => state.adminPoAcceptance.data.invoice)
    // const loading = useSelector(state => state.adminPoAcceptance.data.loading)
    const data = dummyData;
    const loading = false;

    return (
        isEmpty(data) || loading ? <div className='flex justify-center align-middle h-[100vh]'>
            <Loading loading={loading}></Loading>
        </div> :
            <Card>
                <div ref={ref} className='p-5'>
                    <div className=' mb-4'>
                        <ShopDetails data={data?.shop} id={data?.orderId} />
                        <InvoiceTable data={data?.items} bill={data?.bill} status={data?.status} />

                    </div>


                    <div className='text-center mt-1 text-xs'>
                        Developed By <ActionLink href='https://www.5techg.com'>5TechG Lab LLP</ActionLink>
                        <div className='text-xs'>Contact us: +91 7028828831</div>
                    </div>
                    <div className="print:hidden mt-6 flex items-center justify-between">
                        <small className="italic">
                            Invoice was created on a computer and is valid
                            without the signature and seal.
                        </small>
                    </div>
                </div>
            </Card>

    )
})

export default PrintInvoice