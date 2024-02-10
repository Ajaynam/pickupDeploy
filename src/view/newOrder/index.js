// import NewOrderForm from './components/OrderForm.js'

import React, { useEffect } from 'react'
import { Button, Card, FormContainer, Notification, Toast } from '../../components/ui'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import AddProducts from './components/AddProducts'
import SelectedProductTable from './components/SelectedProductTable'
import PaymentSummary from './components/PaymentSummary'
import { useDispatch, useSelector } from 'react-redux'
import { adminPlaceOrder, getAllCategoryList, getAllShopOfPlaceOrder } from './store/dataSlice'
import StickyFooter from '../../components/shared/StickyFooter'
import { useNavigate } from 'react-router-dom'
import { setInitialState } from './store/stateSlice'
import adminNewOrderReducer from './store'
import { injectReducer } from '../../store/index.js'
import ShopProfile from './components/ShopProfile.js'
import isEmpty from 'lodash/isEmpty';

injectReducer('adminNewOrder', adminNewOrderReducer)

const validationSchema = Yup.object().shape({
    po_number: Yup.object().required('po number is required'),
    quantity: Yup.string(),
    availableStock: Yup.string(),
    category: Yup.object().required('Category is required'),
    shopId: Yup.string().required('Shop is required')
})

const initialValue = {
   
    po_number: "",
    PoLists: [
      {
        po_serial_number: "",
        po_quantity: "",
        unit_price: "",
        net_amount: "",
        po_delivery_date: "",
        po_description: "",
        Product: {
          item_code: "",
        },
      },
    ],
    Customer: {
      customer_name: "",
    }
  };

const NewOrders = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setInitialState())
        dispatch(getAllShopOfPlaceOrder())
        dispatch(getAllCategoryList())
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const navigate = useNavigate()
    const product = useSelector(state => state.adminNewOrder.state.selectedProduct)
    const selectedShopDetails = useSelector(state => state.adminNewOrder.data.shopDetails)

    const placeOrderFunction = async ({ values, setSubmitting, resetForm  , }) => {
        setSubmitting(true)
        const { shopId } = values
        const value = {
           
        }

        const action = await dispatch(adminPlaceOrder(value))
        let notification
        if (action?.payload?.status < 300) {
            dispatch(setInitialState())
            notification = (
                <Notification
                    title='Order status'
                    type='success'
                >
                    Order successfully placed
                </Notification>
            )
            resetForm(initialValue)
            navigate(`/invoice/details?id=${action?.payload?.data?.data?.id}`)
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
        setSubmitting(false)
    }


    return (
        <div>
            <Formik
                initialValues={initialValue}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    if (product.length === 0) {
                        const notification = (
                            <Notification
                                title='Warning'
                                type='danger'
                            >
                                Please Add Product
                            </Notification>
                        )
                        Toast.push(notification)
                        setSubmitting(false)
                        return
                    }
                    placeOrderFunction({ values, setSubmitting, resetForm })
                }}
            >
                {({ touched, errors, resetForm, values, setFieldValue, isSubmitting , handleChange}) => (
                    <>
                        <Form>
                            <FormContainer>
                                <div className={`md:grid  gap-3 mt-5 ${isEmpty(selectedShopDetails) ? 'grid-cols-1' : 'grid-cols-3'}`}>
                                    <div className={`${!isEmpty(selectedShopDetails) && 'col-span-2'}`}>
                                        <Card>
                                            {/* <NewOrderForm
                                                touched={touched}
                                                errors={errors}
                                                values={values}
                                            /> */}
                                            <AddProducts
                                                touched={touched}
                                                errors={errors}
                                                values={values}
                                                setFieldValue={setFieldValue}
                                                handleChange = {handleChange}
                                            />
                                        </Card>
                                    </div>
                                    {
                                        !isEmpty(selectedShopDetails) && <div className="col-span-1">
                                            <ShopProfile data={selectedShopDetails} />
                                        </div>
                                    }
                                </div>

                                <div className="md:grid grid-cols-3 gap-3 mt-5">
                                    <div className="col-span-2">
                                        <Card>
                                            <div className='mb-4'>
                                                <h5>Product list</h5>
                                            </div>
                                            <SelectedProductTable />
                                        </Card>
                                    </div>
                                    <div className="col-span-1">
                                        <Card>
                                            <PaymentSummary values={values} />
                                        </Card>
                                    </div>
                                </div>
                                <StickyFooter
                                    className="-mx-8 px-8 flex items-center justify-end py-4"
                                    stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                                >
                                    <div className="md:flex gap-2 items-center">
                                        <Button
                                            size="sm"
                                            variant="solid"
                                            loading={isSubmitting}
                                            type='submit'
                                        >
                                            {isSubmitting
                                                ? 'Please wait'
                                                : 'Place order'}
                                        </Button>

                                    </div>
                                </StickyFooter>
                            </FormContainer>
                        </Form>
                    </>
                )}
            </Formik>
        </div>
    )
}

export default NewOrders