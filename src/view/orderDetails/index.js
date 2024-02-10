import React, { useEffect } from 'react'
import classNames from 'classnames'
import { Button, Notification, Tag, Toast } from '../../components/ui'
import { Loading, Container, DoubleSidedImage } from '../../components/shared'
import OrderProducts from './components/ProductTable'
import PaymentSummary from './components/PaymentSummary'
import CustomerInfo from './components/ShopInfo'
import { HiOutlineCalendar } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'
import dayjs from 'dayjs'
import { useDispatch, useSelector } from 'react-redux'
import { injectReducer } from '../../store'
import useQuery from './../../utils/hooks/useQuery';
import { getOrderDetailsByOrderId, putOrderStatusByOrderId } from './store/dataSlice'
import StickyFooter from '../../components/shared/StickyFooter'
import adminOrderDetailsReducer from './store';
import BillingAddress from './components/BillingAddress'

injectReducer('adminOrderDetails', adminOrderDetailsReducer)


const orderStatusBgColor = {
    confirmed: 'bg-cyan-100 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-100',
    pending: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-100',
    cancel: 'text-red-600 bg-red-100 dark:text-red-100 dark:bg-red-500/20',
}


const statusBgColor = {
    paid: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-100',
    pending: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-100',

}


const OrderDetails = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // const [loading, setLoading] = useState(false)
    // const [data, setData] = useState({})

    const data = useSelector(state => state.adminOrderDetails.data.orderDetails)
    const loading = useSelector(state => state.adminOrderDetails.data.loading)

    const query = useQuery()
    const orderId = query.get('id')

    useEffect(() => {
        if (orderId)
            dispatch(getOrderDetailsByOrderId({ orderId }))
        else {
            navigate('/order/list')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orderId])


    const handleRequest = async (value) => {

        const action = await dispatch(putOrderStatusByOrderId(value))
        let notification
        if (action?.payload?.status < 300) {
            notification = (
                <Notification
                    title='Order status'
                    type='success'
                >
                    {action?.payload?.data?.message}
                </Notification>
            )
            navigate(`/order/list`)
        } else {
            notification = (
                <Notification
                    title='Order status'
                    type='danger'
                >
                    {action?.payload?.data?.message}
                </Notification>
            )
        }
        Toast.push(notification)
        return
    }

    return (
        <Container className="h-full">
            <Loading loading={loading} />
            {(!isEmpty(data) && !loading) && (
                <>
                    <div className="mb-6">
                        <div className='flex justify-between align-middle'>
                            <div className="flex items-center mb-2">
                                <h3>
                                    <span>Order</span>
                                    <span className="ltr:ml-2 rtl:mr-2">
                                        #{data?.orderId}
                                    </span>
                                </h3>
                                {data?.bill?.billstatus !== 'cancel' && <Tag
                                    className={classNames(
                                        'border-0 rounded-md ml-2 rtl:mr-2 capitalize',
                                        statusBgColor[data?.bill?.billstatus]
                                    )}
                                >
                                    {data?.bill?.billstatus}
                                </Tag>
                                }
                                <Tag
                                    className={classNames('border-0 rounded-md ml-2 rtl:mr-2 capitalize',
                                        orderStatusBgColor[data?.status]
                                    )}
                                >
                                    {data?.status}
                                </Tag>
                            </div>
                            <div className='flex ml-2 rtl:mr-2 gap-3'>
                                <Button size='sm' onClick={() => {
                                    navigate(`/invoice/details?id=${data?.orderId}`)
                                }}>
                                    Print view
                                </Button>
                            </div>
                        </div>
                        <span className="flex items-center">
                            <HiOutlineCalendar className="text-lg" />
                            <span className="ml-2 rtl:mr-2">
                                {dayjs(data?.createDate)
                                    .format('ddd DD-MMM-YYYY, hh:mm A')}
                            </span>
                        </span>
                    </div>
                    <div className="xl:flex gap-4">
                        <div className="w-full">
                            <OrderProducts data={data?.items} />
                            <div className="xl:grid grid-cols-2 gap-4">
                                <BillingAddress data={data?.shop} />
                                <PaymentSummary
                                    bill={data?.bill}
                                />
                            </div>
                        </div>
                        <div className="xl:max-w-[360px] w-full">
                            <CustomerInfo data={data?.shop} />
                        </div>
                    </div>
                    {(data.status === 'pending' && !loading) && <StickyFooter
                        className="-mx-8 px-8 flex items-center justify-end py-4"
                        stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                    >
                        <div className='flex ml-2 rtl:mr-2 gap-3'>
                            <Button variant='solid' size='sm' onClick={() => {
                                handleRequest({ orderId: data?.orderId, status: 'confirmed' })
                            }}>
                                Confirm
                            </Button>
                            <Button variant='solid' color='red-500' size='sm' onClick={() => {
                                handleRequest({ orderId: data?.orderId, status: 'rejected' })
                            }}>
                                Reject
                            </Button>
                        </div>
                    </StickyFooter>
                    }
                </>
            )}
            {!loading && isEmpty(data) && (
                <div className="h-full flex flex-col items-center justify-center">
                    <DoubleSidedImage
                        src="/img/others/img-2.png"
                        darkModeSrc="/img/others/img-2-dark.png"
                        alt="No order found!"
                    />
                    <h3 className="mt-8">No order found!</h3>
                </div>
            )}
        </Container>
    )
}

export default OrderDetails
