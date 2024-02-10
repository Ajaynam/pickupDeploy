import React, { useEffect, useMemo, useState } from 'react'
import { Button, DatePicker, FormItem, Input, Notification, Select, Toast } from '../../../components/ui'
import { Field } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedProduct } from '../store/stateSlice'
import { getAllCustomer } from '../store/dataSlice'

const AddProducts = (props) => {
    const dispatch = useDispatch()
    const { touched, errors, values, handleChange } = props


    const [customerOption, setCustomerOption] = useState([]);

    const customers = useSelector((state) => state.adminNewOrder.data.CostumerList);
    console.log(customers)
    useEffect(() => {
        const customerOption = customers.map((customer) => ({

            value: customer.customer_id,
            label: customer.customer_name,
        }));
        console.log(customerOption)
        setCustomerOption(customerOption);
    }, [customers]);

    useEffect(() => {
        dispatch(getAllCustomer());
    }, [dispatch]);


    const handle = () => {
        dispatch(setSelectedProduct({ product: values.product, ItemCode: values.ItemCode, category: values.category }))
        const notification = (
            <Notification
                title={<span className='capitalize'>{values?.product?.name}</span>}
                type='success'
            >
                Product added
            </Notification>
        )
        return Toast.push(notification)
    }

    return (
        <div className="md:grid grid-cols-3 gap-3">

            <FormItem
                label="Customer Name"
                invalid={errors.customer_name && touched.customer_name}
                errorMessage={errors.customer_name}
            >

                {customerOption && (
                    <Select
                        type="text"
                        name="customer_name"
                        options={customerOption}
                        value={values.customer_id}
                        onChange={(selectedOption) => {
                            handleChange({
                                target: {
                                    name: 'customer_name',
                                    value: selectedOption.value,
                                },
                            });
                        }}

                    />

                )}
            </FormItem>
            <FormItem
                label="PO Number"
                invalid={errors.po_number && touched.po_number}
                errorMessage={errors.po_number}
           
            >
                <Field
                    type="number"
                    autoComplete="off"
                    name="po_number"
                    value={values.po_number}
                    placeholder="PO Number"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Po Serial No."
                invalid={
                  errors.PoLists &&
                  errors.PoLists[0] &&
                  touched.PoLists &&
                  touched.PoLists[0] &&
                  errors.PoLists[0].po_serial_number
                }
                errorMessage={
                  errors.PoLists &&
                  errors.PoLists[0] &&
                  touched.PoLists &&
                  touched.PoLists[0] &&
                  errors.PoLists[0].po_serial_number
                }
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="PoLists[0].po_serial_number"
                  placeholder="Po Serial No."
                  component={Input}
                />
              </FormItem>
              <FormItem
                label="po quantity"
                invalid={
                  errors.PoLists &&
                  errors.PoLists[0] &&
                  touched.PoLists &&
                  touched.PoLists[0] &&
                  errors.PoLists[0].po_quantity
                }
                errorMessage={
                  errors.PoLists &&
                  errors.PoLists[0] &&
                  touched.PoLists &&
                  touched.PoLists[0] &&
                  errors.PoLists[0].po_quantity
                }
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="PoLists[0].po_quantity"
                  placeholder="po quantity"
                  component={Input}
                />
              </FormItem>   
              <FormItem
                label="unit price"
                invalid={
                  errors.PoLists &&
                  errors.PoLists[0] &&
                  touched.PoLists &&
                  touched.PoLists[0] &&
                  errors.PoLists[0].unit_price
                }
                errorMessage={
                  errors.PoLists &&
                  errors.PoLists[0] &&
                  touched.PoLists &&
                  touched.PoLists[0] &&
                  errors.PoLists[0].unit_price
                }
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="PoLists[0].unit_price"
                  placeholder="unit price"
                  component={Input}
                />
              </FormItem>
              <FormItem
                label="net amount"
                invalid={
                  errors.PoLists &&
                  errors.PoLists[0] &&
                  touched.PoLists &&
                  touched.PoLists[0] &&
                  errors.PoLists[0].net_amount
                }
                errorMessage={
                  errors.PoLists &&
                  errors.PoLists[0] &&
                  touched.PoLists &&
                  touched.PoLists[0] &&
                  errors.PoLists[0].net_amount
                }
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="PoLists[0].net_amount"
                  placeholder="net amount"
                  component={Input}
                />
              </FormItem>
              <FormItem
                label="po_delivery_date"
                invalid={
                  errors.PoLists &&
                  errors.PoLists[0] &&
                  touched.PoLists &&
                  touched.PoLists[0] &&
                  errors.PoLists[0].po_delivery_date
                }
                errorMessage={
                  errors.PoLists &&
                  errors.PoLists[0] &&
                  touched.PoLists &&
                  touched.PoLists[0] &&
                  errors.PoLists[0].po_delivery_date
                }
              >
                <DatePicker
                  type="text"
                  autoComplete="off"
                  name="PoLists[0].po_delivery_date"
                  placeholder="po delivery date"
                  component={Input}
                />
              </FormItem>
              <FormItem
                label="po description"
                invalid={
                  errors.PoLists &&
                  errors.PoLists[0] &&
                  touched.PoLists &&
                  touched.PoLists[0] &&
                  errors.PoLists[0].po_description
                }
                errorMessage={
                  errors.PoLists &&
                  errors.PoLists[0] &&
                  touched.PoLists &&
                  touched.PoLists[0] &&
                  errors.PoLists[0].po_description
                }
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="PoLists[0].po_description"
                  placeholder="po description"
                  component={Input}
                />
              </FormItem>
              <FormItem
                label="unit price"
                invalid={
                  errors.PoLists &&
                  errors.PoLists[0] &&
                  touched.PoLists &&
                  touched.PoLists[0] &&
                  errors.PoLists[0].Product.Item_code
                }
                errorMessage={
                  errors.PoLists &&
                  errors.PoLists[0] &&
                  touched.PoLists &&
                  touched.PoLists[0] &&
                  errors.PoLists[0].Product.Item_code
                }
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="PoLists[0].Product.Item_code"
                  placeholder="Item code"
                  component={Input}
                />
              </FormItem>
           
            
            <FormItem
                label="Action"
            >
                <Button type="button" variant='solid' onClick={handle}>
                    Add
                </Button>
            </FormItem>
        </div>
    )
}

export default AddProducts