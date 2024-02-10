

import {
  Input,
  Button,
  FormItem,
  FormContainer,
  Notification,
  Select,
  Toast,
  DatePicker,
} from '../../../components/ui';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { getAdminCreateNewCustomer, getAllCustomer } from '../store/dataSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';


const validationSchema = Yup.object().shape({

  customer_name: Yup.string().required('Name Required'),
  PONumber: Yup.string().required('PONumber Required'),
  POSerialNumber: Yup.string().required('PO SerialNumberRequired '),
  // PODate: Yup.string().required('PO Date is Required'),
  ItemCode: Yup.string().required('Please enter  ItemCode'),
  DrawingRevision: Yup.string().required('Please enter  Drawing Revision'),
  POQuantity: Yup.string().required('Please enter your POQuantity'),
  // unit: Yup.string().required('Please enter your unit'),
  UnitPrice: Yup.string().required('Please enter your UnitPrice'),
  NetAmount: Yup.string().required('Please enter your NetAmount'),
  // PODeliveryDate: Yup.string().required('Please enter your PODeliveryDate'),
  DeliveryTerms: Yup.string().required('Please enter your DeliveryTerms'),
  Remarks: Yup.string().required('Please enter your Remarks')
});

const UnitOptions = [
  { label: 'Kg', value: "Kg" },
  { label: 'MM', value: "MM" },
  // { label: 'Infrastructure', value: true },
  // { label: 'Machine Tools', value: true },
]

const data = {
  customer_name: '',
  PONumber: '',
  POSerialNumber: '',
  // PODate: '',
  ItemCode: '',
  DrawingRevision: '',
  POQuantity: '',
  // unit: '',
  UnitPrice: '',
  NetAmount: '',
  // PODeliveryDate: '',
  DeliveryTerms: "",
  Remarks: ""
};

const PersonalInformation = ({ onSubmit }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [customerOption, setCustomerOption] = useState([]);

  const customers = useSelector((state) => state.adminNewOwner.data.shopOwnerList);
  console.log(customers)
  // Map the customer data to the format expected by the Select component
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





  return (
    <Formik
      initialValues={data}
      enableReinitialize={true}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        onSubmit(values)
        setSubmitting(true);



        //   let action = await dispatch(getAdminCreateNewCustomer({ ...values }));
        let notificationWithAvatar;

        //   if (action?.payload?.status < 400) {
        //     notificationWithAvatar = (
        //       <Notification title={values?.name}>
        //         {action?.payload?.data?.message}
        //       </Notification>
        //     );
        //     console.log(action.payload.data.message)
        //     // navigate('/shop/list');
        //   } else {
        //     notificationWithAvatar = (
        //       <Notification title={values?.customer_email} type="danger">
        //         {action?.payload?.data?.message}
        //       </Notification>
        //     );
        //   }

        Toast.push(notificationWithAvatar);
        setSubmitting(false);
      }}
    >


      {({ values, touched, errors, isSubmitting, handleChange }) => (
        <Form>
          <FormContainer>
            <div className="mb-8">
              <h3 className="mb-2">Add Po Entry </h3>
              <p>Basic information </p>
            </div>
            <div className="md:grid grid-cols-3 gap-4">
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
                invalid={errors.PONumber && touched.PONumber}
                errorMessage={errors.PONumber}
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="PONumber"
                  placeholder="PO Number"
                  component={Input}
                />
              </FormItem>
              <FormItem
                label="PO Serial Number "
                invalid={errors.POSerialNumber && touched.POSerialNumber}
                errorMessage={errors.POSerialNumber}
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="POSerialNumber"
                  placeholder="PO Serial Number "
                  component={Input}
                />
              </FormItem>
              {/* <FormItem
                label="PO Date"
              // invalid={errors.PODate && touched.PODate}
              // errorMessage={errors.PODate}
              >
                <DatePicker
                  type="text"
                  autoComplete="off"
                  name="PODate"
                  placeholder="PO Date"
                  component={Input}
                />
              </FormItem> */}
              <FormItem
                label="Item Code"
                invalid={errors.ItemCode && touched.ItemCode}
                errorMessage={errors.ItemCode}
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="ItemCode"
                  placeholder="Item Code"
                  component={Input}
                />
              </FormItem>
              <FormItem
                label="Drawing Revision No."
                invalid={errors.DrawingRevision && touched.DrawingRevision}
                errorMessage={errors.DrawingRevision}
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="DrawingRevision"
                  placeholder="Drawing Revision No."
                  component={Input}
                />
              </FormItem>
              <FormItem
                label="PO Quantity."
                invalid={errors.POQuantity && touched.POQuantity}
                errorMessage={errors.POQuantity}
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="POQuantity"
                  placeholder="PO Quantity"
                  component={Input}
                />
              </FormItem>
              {/* <FormItem
                label="Unit"
              invalid={
                  errors.unit &&
                  touched.unit
              }
              // errorMessage={errors.unit}
              >
                <Field name="Unit">
                  {({ field, form }) => (
                    <Select
                      placeholder="Unit"
                      field={field}
                      form={form}
                      options={UnitOptions}
                      value={UnitOptions.filter(
                        (status) =>
                          status.value ===
                          values.unit
                      )}
                      onChange={(status) =>
                        form.setFieldValue(
                          field.label,
                          status.value
                        )
                      }
                    />
                  )}
                </Field>
              </FormItem> */}

              <FormItem
                label="Unit Price"
                invalid={errors.UnitPrice && touched.UnitPrice}
                errorMessage={errors.UnitPrice}
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="UnitPrice"
                  placeholder="Unit Price"
                  component={Input}
                />
              </FormItem>
              <FormItem
                label="Net Amount"
                invalid={errors.NetAmount && touched.NetAmount}
                errorMessage={errors.NetAmount}
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="NetAmount"
                  placeholder="Net Amount "
                  component={Input}
                />
              </FormItem>
              {/* <FormItem
                label="PO Delivery Date"
              // invalid={errors.PODeliveryDate && touched.PODeliveryDate}
              // errorMessage={errors.PODeliveryDate}
              >
                <DatePicker
                  type="text"
                  autoComplete="off"
                  name="PODeliveryDate"
                  placeholder="PO Delivery Date"
                  component={Input}
                />
              </FormItem> */}

              <FormItem
                label="Delivery Terms "
                invalid={errors.DeliveryTerms && touched.DeliveryTerms}
                errorMessage={errors.DeliveryTerms}
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="DeliveryTerms"
                  placeholder="Delivery Terms"
                  component={Input}
                />
              </FormItem>
              <FormItem
                label="Remarks"
                invalid={errors.Remarks && touched.Remarks}
              // errorMessage={errors.Remarks}
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="Remarks"
                  placeholder="Remarks"
                  component={Input}
                />
              </FormItem>


            </div>

            <div className="flex justify-end gap-2">
              <Button
                loading={isSubmitting}
                variant="solid"
                type="submit"
              >
                {isSubmitting ? 'Please wait' : 'Save'}
              </Button>
            </div>
          </FormContainer>
        </Form>
      )}
    </Formik>
  );
};

export default PersonalInformation;

