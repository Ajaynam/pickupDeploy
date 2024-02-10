

import {
  Input,
  Button,
  FormItem,
  FormContainer,
  Notification,
  Toast,
} from '../../../components/ui';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { getAdminCreateNewCustomer } from '../store/dataSlice';
import { useDispatch } from 'react-redux';

const validationSchema = Yup.object().shape({
  customer_name: Yup.string().required('Customer name Required'),
  customer_mobile: Yup.array().of(Yup.string().required('Mobile Required')),
  customer_address: Yup.array().of(Yup.string().required('Address Required')),
  customer_contact_person: Yup.array().of(
    Yup.object().shape({
      person: Yup.string().required('Contact Person Required'),
      mobile: Yup.string().required('Mobile Required'),
    })
  ),
  customer_city: Yup.string().required('City is Required'),
  customer_pincode: Yup.string().required('Pin Code is Required'),
  customer_state: Yup.string().required('State is Required'),
  customer_email: Yup.array().of(Yup.string().email('Invalid email')),
  customer_pan: Yup.string().required('PAN Number is Required'),
  customer_gstin: Yup.string().required('GSTIN is Required'),
});

const data = {
  customer_name: '',
  customer_mobile: [''],
  customer_address: [''],
  customer_contact_person: [
    {
      person: '',
      mobile: '',
    },
  ],
  customer_city: '',
  customer_pincode: '',
  customer_state: '',
  customer_email: [''],
  customer_pan: '',
  customer_gstin: '',
};

const PersonalInformation = ({ onSubmit}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={data}
      enableReinitialize={true}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        values.customer_mobile = values.customer_mobile.map(Number);
        values.customer_pincode = Number(values.customer_pincode);
        values.customer_contact_person = values.customer_contact_person.map(person => ({
          ...person,
          mobile: Number(person.mobile),
        }));
        onSubmit(values)
        setSubmitting(true);



        let action = await dispatch(getAdminCreateNewCustomer({ ...values }));
        let notificationWithAvatar;

        if (action?.payload?.status < 400) {
          notificationWithAvatar = (
            <Notification title={values?.customer_name}>
              {action?.payload?.data?.message}
            </Notification>
          );
          console.log(action.payload.data.message)
          // navigate('/shop/list');
        } else {
          notificationWithAvatar = (
            <Notification title={values?.customer_email} type="danger">
              {action?.payload?.data?.message}
            </Notification>
          );
        }

        Toast.push(notificationWithAvatar);
        setSubmitting(false);
      }}
     >


      {({ values, touched, errors, isSubmitting }) => (
        <Form>
          <FormContainer>
            <div className="mb-8">
              <h3 className="mb-2">Add Customer </h3>
              <p>Basic information </p>
            </div>
            <div className="md:grid grid-cols-3 gap-4">
              <FormItem
                label="Customer Name"
                invalid={errors.customer_name && touched.customer_name}
                errorMessage={errors.customer_name}
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="customer_name"
                  placeholder="Customer Name"
                  component={Input}
                />
              </FormItem>
              <FormItem
                label="Customer Mobile"
                invalid={errors.customer_mobile && touched.customer_mobile}
                errorMessage={errors.customer_mobile}
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="customer_mobile[0]"
                  placeholder="Customer Mobile"
                  component={Input}
                />
              </FormItem>

              <FormItem
                label="Customer Address"
                invalid={errors.customer_address && touched.customer_address}
                errorMessage={errors.customer_address}
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="customer_address[0]"
                  placeholder="Customer Address"
                  component={Input}
                />
              </FormItem>

              {/* <FormItem
                  label="Contact Person"
                  invalid={
                    errors.customer_contact_person &&
                    touched.customer_contact_person
                  }
                  errorMessage={errors.customer_contact_person}
                >
                  <Field
                    type="text"
                    autoComplete="off"
                    name="customer_contact_person[0].person"
                    placeholder="Contact Person"
                    component={Input}
                  />
                </FormItem> */}
              <FormItem
                label="Contact Person Mobile"
                invalid={
                  errors.customer_contact_person &&
                  errors.customer_contact_person[0] &&
                  touched.customer_contact_person &&
                  touched.customer_contact_person[0] &&
                  errors.customer_contact_person[0].mobile
                }
                errorMessage={
                  errors.customer_contact_person &&
                  errors.customer_contact_person[0] &&
                  touched.customer_contact_person &&
                  touched.customer_contact_person[0] &&
                  errors.customer_contact_person[0].mobile
                }
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="customer_contact_person[0].mobile"
                  placeholder="Contact Person Mobile"
                  component={Input}
                />
              </FormItem>
              <FormItem
                label="Contact Person Name"
                invalid={
                  errors.customer_contact_person &&
                  errors.customer_contact_person[0] &&
                  touched.customer_contact_person &&
                  touched.customer_contact_person[0] &&
                  errors.customer_contact_person[0].person
                }
                errorMessage={
                  errors.customer_contact_person &&
                  errors.customer_contact_person[0] &&
                  touched.customer_contact_person &&
                  touched.customer_contact_person[0] &&
                  errors.customer_contact_person[0].person
                }
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="customer_contact_person[0].person"
                  placeholder="Contact Person Name"
                  component={Input}
                />
              </FormItem>


              <FormItem
                label="City"
                invalid={errors.customer_city && touched.customer_city}
                errorMessage={errors.customer_city}
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="customer_city"
                  placeholder="City"
                  component={Input}
                />
              </FormItem>

              <FormItem
                label="Pin Code"
                invalid={errors.customer_pincode && touched.customer_pincode}
                errorMessage={errors.customer_pincode}
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="customer_pincode"
                  placeholder="Pin Code"
                  component={Input}
                />
              </FormItem>

              <FormItem
                label="State"
                invalid={errors.customer_state && touched.customer_state}
                errorMessage={errors.customer_state}
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="customer_state"
                  placeholder="State"
                  component={Input}
                />
              </FormItem>

              <FormItem
                label="Email"
                invalid={errors.customer_email && touched.customer_email}
                errorMessage={errors.customer_email}
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="customer_email[0]"
                  placeholder="Email"
                  component={Input}
                />
              </FormItem>

              <FormItem
                label="PAN Number"
                invalid={errors.customer_pan && touched.customer_pan}
                errorMessage={errors.customer_pan}
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="customer_pan"
                  placeholder="PAN Number"
                  component={Input}
                />
              </FormItem>

              <FormItem
                label="GSTIN"
                invalid={errors.customer_gstin && touched.customer_gstin}
                errorMessage={errors.customer_gstin}
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="customer_gstin"
                  placeholder="GSTIN"
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

