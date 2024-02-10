// import {
//     Input,
//     Button,
//     FormItem,
//     FormContainer,
//     Notification,
//     Select,
//     Toast,
// } from '../../../components/ui'
// import { Field, Form, Formik } from 'formik'
// import * as Yup from 'yup'
// import { DoubleSidedImage, PasswordInput } from '../../../components/shared'
// import DocumentUploadField from './DocumentUploadField'
// import { useNavigate } from 'react-router-dom'
// import { getAdminCreateNewOwner } from '../store/dataSlice'
// import { useDispatch } from 'react-redux'

// const validationSchema = Yup.object().shape({
//     // CustomerType: Yup.string().required('Customer Type is Required'),
//     Code: Yup.string().required(' Code Required'),
//     name: Yup.string().required('Supplier name Required'),
//     ContactPerson: Yup.string().required('Contact Person Required'),
//     phone: Yup.string().required('phone Required'),
//     gstNumber: Yup.string().required('gst Number Required'),
//     panNumber: Yup.string().required('pan Number Required'),
//     supplierCode: Yup.string().required('supplier Code Required'),
//     // GroupCd: Yup.string().required('Customer name Required'),
//     marketingBy: Yup.string().required('marketing By Required'),
//     email: Yup.string().email('Invalid email'),
//     address_1: Yup.string().required('Address 1 Required '),
//     address_2: Yup.string().required('Address 2 Code Required '),
//     city: Yup.string().required('city is Required'),
//     pincode: Yup.string().required('Please enter your pincode'),
//     state: Yup.string().required('Please enter your state'),
//     country: Yup.string().required('Please enter your country'),
//     cpassword: Yup.string().oneOf(
//         [Yup.ref('password'), null],
//         'Your passwords do not match'
//     ).required('Password required'),
// })




// const data = {
//     name: '',
//     email: '',
//     password: '',
//     cpassword: '',
//     state: '',
//     district: '',
//     address_1: '',
//     address_2: '',
//     village: '',
//     block: '',
//     image: '',
//     pincode: ''
// }
// const PersonalInformation = () => {
//     const dispatch = useDispatch()
//     const navigate = useNavigate()
//     return (
//         <>
//             <Formik
//                 initialValues={data}
//                 enableReinitialize={true}
//                 validationSchema={validationSchema}
//                 onSubmit={async (values, { setSubmitting }) => {

//                     setSubmitting(true)
//                     // const form = new FormData()
//                     // form.append('file', values.image)
//                     // let image = await dispatch(uploadImage(form))
//                     let action = await dispatch(getAdminCreateNewOwner({ ...values }))
//                     let notificationWithAvatar
//                     if (action?.payload?.status < 400) {
//                         notificationWithAvatar = (
//                             <Notification
//                                 title={values?.name}
//                             // customIcon={
//                             //     <Avatar shape="circle" src={appConfig.apiPrefix + image?.payload?.data?.filename} />
//                             // }
//                             >
//                                 {action?.payload?.data?.message}
//                             </Notification>
//                         )
//                         navigate('/shop/list')
//                     } else {
//                         notificationWithAvatar = (
//                             <Notification
//                                 title={values?.email}
//                                 type='danger'
//                             >
//                                 {action?.payload?.data?.message}
//                             </Notification>
//                         )
//                     }
//                     Toast.push(notificationWithAvatar)
//                     setSubmitting(false)
//                 }}
//             >
//                 {({ values, touched, errors, isSubmitting }) => {
//                     const validatedProps = { touched, errors }
//                     return (
//                         <Form>
//                             <FormContainer>
//                                 <div className="mb-8">
//                                     <h3 className="mb-2">Add Supplier </h3>
//                                     <p>Basic information  </p>
//                                 </div>
//                                 <div className="md:grid grid-cols-3 gap-4">
//                                     {/* <FormItem
//                                         label="Type	"
//                                         invalid={
//                                             errors.CostumerType &&
//                                             touched.CostumerType
//                                         }
//                                         errorMessage={errors.CostumerType}
//                                     >
//                                         <Field name="Type	">
//                                             {({ field, form }) => (
//                                                 <Select
//                                                     placeholder="Type"
//                                                     field={field}
//                                                     form={form}
//                                                     options={CostumerTypeOptions}
//                                                     value={CostumerTypeOptions.filter(
//                                                         (status) =>
//                                                             status.value ===
//                                                             values.CostumerType
//                                                     )}
//                                                   onChange={(status) =>
//                                                     form.setFieldValue(
//                                                       field.name,
//                                                       status.value
//                                                     )
//                                                   }
//                                                 />
//                                             )}
//                                         </Field>
//                                     </FormItem> */}

//                                     {/* <FormItem
//                                         label="Code"
//                                         invalid={errors.Code && touched.Code}
//                                         errorMessage={errors.Code}
//                                     >
//                                         <Field
//                                             type="text"
//                                             autoComplete="off"
//                                             name="Code"
//                                             placeholder="Code"
//                                             component={Input}
//                                         />
//                                     </FormItem> */}
//                                     <FormItem
//                                         label="Supplier Name"
//                                         invalid={errors.name && touched.name}
//                                         errorMessage={errors.name}
//                                     >
//                                         <Field
//                                             type="text"
//                                             autoComplete="off"
//                                             name="name"
//                                             placeholder="Full name"
//                                             component={Input}
//                                         />
//                                     </FormItem>

//                                     <FormItem
//                                         label="Contact Person"
//                                         invalid={errors.ContactPerson && touched.ContactPerson}
//                                         errorMessage={errors.ContactPerson}
//                                     >
//                                         <Field
//                                             type="text"
//                                             autoComplete="off"
//                                             name="ContactPerson"
//                                             placeholder="Contact Person"
//                                             component={Input}
//                                         />
//                                     </FormItem>
//                                     <FormItem
//                                         label="Email"
//                                         invalid={errors.email && touched.email}
//                                         errorMessage={errors.email}
//                                     >
//                                         <Field
//                                             type="text"
//                                             autoComplete="off"
//                                             name="email"
//                                             placeholder="Email "
//                                             component={Input}
//                                         />
//                                     </FormItem>

//                                     <FormItem
//                                         label="Phone"
//                                         invalid={errors.phone && touched.phone}
//                                         errorMessage={errors.phone}
//                                     >
//                                         <Field
//                                             type="text"
//                                             autoComplete="off"
//                                             name="phone"
//                                             placeholder="Phone"
//                                             component={Input}
//                                         />
//                                     </FormItem>
//                                     <FormItem
//                                         label="Gst Number"
//                                         invalid={errors.gstNumber && touched.gstNumber}
//                                         errorMessage={errors.gstNumber}
//                                     >
//                                         <Field
//                                             type="text"
//                                             autoComplete="off"
//                                             name="gstNumber"
//                                             placeholder="Gst Number "
//                                             component={Input}
//                                         />
//                                     </FormItem>
//                                     <FormItem
//                                         label="Pan Number "
//                                         invalid={errors.panNumber && touched.panNumber}
//                                         errorMessage={errors.panNumber}
//                                     >
//                                         <Field
//                                             type="text"
//                                             autoComplete="off"
//                                             name="panNumber"
//                                             placeholder="Pan Number "
//                                             component={Input}
//                                         />
//                                     </FormItem>
//                                     <FormItem
//                                         label="Supplier Code "
//                                         invalid={errors.supplierCode  && touched.supplierCode}
//                                         errorMessage={errors.supplierCode}
//                                     >
//                                         <Field
//                                             type="text"
//                                             autoComplete="off"
//                                             name="supplierCode"
//                                             placeholder="Supplier Code "
//                                             component={Input}
//                                         />
//                                     </FormItem>
//                                     {/* <FormItem
//                                         label=" Group Cd"
//                                         invalid={errors.GroupCd && touched.GroupCd}
//                                         errorMessage={errors.GroupCd}
//                                     >
//                                         <Field
//                                             type="text"
//                                             autoComplete="off"
//                                             name="GroupCd"
//                                             placeholder="Group Cd "
//                                             component={Input}
//                                         />
//                                     </FormItem> */}
//                                     {/* <FormItem
//                                         label=" Marketing By"
//                                         invalid={errors.marketingBy && touched.marketingBy}
//                                         errorMessage={errors.marketingBy}
//                                     >
//                                         <Field
//                                             type="text"
//                                             autoComplete="off"
//                                             name="marketingBy"
//                                             placeholder="marketing By  "
//                                             component={Input}
//                                         />
//                                     </FormItem> */}
//                                 </div>


//                                 <div className="mb-8 mt-6">
//                                     <h3 className="mb-2">Adress </h3>
//                                     <p></p>
//                                 </div>


//                                 <div className='md:grid grid-cols-3 gap-4'>
//                                 <FormItem
//                                         label="Address 1"
//                                         invalid={errors.address_1 && touched.address_1}
//                                         errorMessage={errors.address_1}
//                                     >
//                                         <Field
//                                             type="text"
//                                             autoComplete="off"
//                                             name="address_1"
//                                             placeholder="Address 1"
//                                             component={Input}
//                                         />
//                                     </FormItem>
//                                     <FormItem
//                                         label="Address 2"
//                                         invalid={errors.address_2 && touched.address_2}
//                                         errorMessage={errors.address_2}
//                                     >
//                                         <Field
//                                             type="text"
//                                             autoComplete="off"
//                                             name="address_2"
//                                             placeholder="Address 2"
//                                             component={Input}
//                                         />
//                                     </FormItem>
//                                     <FormItem
//                                         label="city"
//                                         invalid={errors.city && touched.city}
//                                         errorMessage={errors.city}
//                                     >
//                                         <Field
//                                             type="text"
//                                             autoComplete="off"
//                                             name="city"
//                                             placeholder="city"
//                                             component={Input}
//                                         />
//                                     </FormItem>
//                                     <FormItem
//                                         label="Pin Code"
//                                         invalid={errors.pincode && touched.pincode}
//                                         errorMessage={errors.pincode}
//                                     >
//                                         <Field
//                                             type="text"
//                                             autoComplete="off"
//                                             name="pincode"
//                                             placeholder="Pin Code "
//                                             component={Input}
//                                         />
//                                     </FormItem>
//                                     <FormItem
//                                         label="State"
//                                         invalid={errors.state && touched.state}
//                                         errorMessage={errors.state}
//                                     >
//                                         <Field
//                                             type="text"
//                                             autoComplete="off"
//                                             name="state"
//                                             placeholder="state"
//                                             component={Input}
//                                         />
//                                     </FormItem>
//                                     <FormItem
//                                         label="country"
//                                         invalid={errors.country && touched.country}
//                                         errorMessage={errors.country}
//                                     >
//                                         <Field
//                                             type="text"
//                                             autoComplete="off"
//                                             name="country"
//                                             placeholder="country"
//                                             component={Input}
//                                         />
//                                     </FormItem>
//                                 </div>


//                                 <div className="flex justify-end gap-2">
//                                     <Button
//                                         loading={isSubmitting}
//                                         variant="solid"
//                                         type="submit"
//                                     >
//                                         {isSubmitting
//                                             ? 'Please wait'
//                                             : 'Save'}
//                                     </Button>
//                                 </div>
//                             </FormContainer>
//                         </Form>
//                     )
//                 }}
//             </Formik>
//         </>
//     )
// }

// export default PersonalInformation





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
// import { getAdminCreateNewSupplier } from '../store/dataSlice';
import { useDispatch } from 'react-redux';

const validationSchema = Yup.object().shape({
  supplier_name: Yup.string().required('Supplier name Required'),
  supplier_mobile: Yup.array().of(Yup.string().required('Mobile Required')),
  supplier_address: Yup.array().of(Yup.string().required('Address Required')),
  supplier_contact_person: Yup.array().of(
    Yup.object().shape({
      person: Yup.string().required('Contact Person Required'),
      mobile: Yup.string().required('Mobile Required'),
    })
  ),
  supplier_city: Yup.string().required('City is Required'),
  supplier_pincode: Yup.string().required('Pin Code is Required'),
  supplier_state: Yup.string().required('State is Required'),
  supplier_email: Yup.array().of(Yup.string().email('Invalid email')),
  supplier_pan: Yup.string().required('PAN Number is Required'),
  supplier_gstin: Yup.string().required('GSTIN is Required'),
});

const data = {
  supplier_name: '',
  supplier_mobile: [''],
  supplier_address: [''],
  supplier_contact_person: [
    {
      person: '',
      mobile: '',
    },
  ],
  supplier_city: '',
  supplier_pincode: '',
  supplier_state: '',
  supplier_email: [''],
  supplier_pan: '',
  supplier_gstin: '',
};

const PersonalInformation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={data}
      enableReinitialize={true}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        values.supplier_mobile = values.supplier_mobile.map(Number);
        values.supplier_pincode = Number(values.supplier_pincode);
        values.supplier_contact_person = values.supplier_contact_person.map(person => ({
          ...person,
          mobile: Number(person.mobile),
        }));
        setSubmitting(true);



        let action = await dispatch(({ ...values }));
        let notificationWithAvatar;

        if (action?.payload?.status < 400) {
          notificationWithAvatar = (
            <Notification title={values?.supplier_name}>
              {action?.payload?.data?.message}
            </Notification>
          );
          console.log(action.payload.data.message)
          // navigate('/shop/list');
        } else {
          notificationWithAvatar = (
            <Notification title={values?.supplier_email} type="danger">
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
              <h3 className="mb-2">Add New Order </h3>
              <p>Basic information </p>
            </div>
            <div className=' border  rounded-md px-4 pt-2'>
                <h5 className="mb-4">Parcel Details </h5>
                <div className="md:grid grid-cols-3 gap-x-4  ">
                  <FormItem
                    label="Weight in kg"
                    invalid={errors.supplier_name && touched.supplier_name}
                    errorMessage={errors.supplier_name}
                  >
                    <Field
                      type="text"
                      autoComplete="off"
                      name="supplier_name"
                      placeholder="Weight in kg"
                      component={Input}
                    />
                  </FormItem>
                  <FormItem
                    label="Product Description"
                    invalid={errors.supplier_mobile && touched.supplier_mobile}
                    errorMessage={errors.supplier_mobile}
                  >
                    <Field
                      type="text"
                      autoComplete="off"
                      name="supplier_mobile[0]"
                      placeholder="Product Description"
                      component={Input}
                    />
                  </FormItem>

                  <FormItem
                    label="Product Value"
                    invalid={errors.supplier_address && touched.supplier_address}
                    errorMessage={errors.supplier_address}
                  >
                    <Field
                      type="text"
                      autoComplete="off"
                      name="supplier_address[0]"
                      placeholder="Product Value"
                      component={Input}
                    />
                  </FormItem>

                  <FormItem
                    label="number Of Parcel"
                    invalid={errors.supplier_city && touched.supplier_city}
                    errorMessage={errors.supplier_city}
                  >
                    <Field
                      type="text"
                      autoComplete="off"
                      name="supplier_city"
                      placeholder="number Of Parcel"
                      component={Input}
                    />
                  </FormItem>

                  <FormItem
                    label="Length (cm)"
                    invalid={errors.supplier_pincode && touched.supplier_pincode}
                    errorMessage={errors.supplier_pincode}
                  >
                    <Field
                      type="text"
                      autoComplete="off"
                      name="supplier_pincode"
                      placeholder="Length "
                      component={Input}
                    />
                  </FormItem>

                  <FormItem
                    label="State"
                    invalid={errors.supplier_state && touched.supplier_state}
                    errorMessage={errors.supplier_state}
                  >
                    <Field
                      type="width (cm)"
                      autoComplete="off"
                      name="supplier_state"
                      placeholder="width "
                      component={Input}
                    />
                  </FormItem>

                  <FormItem
                    label="Height (cm)"
                    invalid={errors.supplier_email && touched.supplier_email}
                    errorMessage={errors.supplier_email}
                  >
                    <Field
                      type="text"
                      autoComplete="off"
                      name="supplier_email[0]"
                      placeholder="Height"
                      component={Input}
                    />
                  </FormItem>


                </div>
              </div>
            <div className='grid mt-4 grid-cols-2 gap-2'>
              <div className=' border rounded-md px-4 pt-2'>
                <h5 className="mb-4">Pickup Address </h5>
                <div className="md:grid grid-cols-2 gap-x-4  ">
                  <FormItem
                    label="Pickup Contact Name"
                    invalid={errors.supplier_name && touched.supplier_name}
                    errorMessage={errors.supplier_name}
                  >
                    <Field
                      type="text"
                      autoComplete="off"
                      name="supplier_name"
                      placeholder="Pickup Contact Name"
                      component={Input}
                    />
                  </FormItem>
                  <FormItem
                    label="Pickup Mobile"
                    invalid={errors.supplier_mobile && touched.supplier_mobile}
                    errorMessage={errors.supplier_mobile}
                  >
                    <Field
                      type="text"
                      autoComplete="off"
                      name="supplier_mobile[0]"
                      placeholder="Pickup Mobile"
                      component={Input}
                    />
                  </FormItem>

                  <FormItem
                    label="Pickup Address"
                    invalid={errors.supplier_address && touched.supplier_address}
                    errorMessage={errors.supplier_address}
                  >
                    <Field
                      type="text"
                      autoComplete="off"
                      name="supplier_address[0]"
                      placeholder="Pickup Address"
                      component={Input}
                    />
                  </FormItem>

                  <FormItem
                    label="Pickup Pincode"
                    invalid={errors.supplier_city && touched.supplier_city}
                    errorMessage={errors.supplier_city}
                  >
                    <Field
                      type="text"
                      autoComplete="off"
                      name="supplier_city"
                      placeholder="Pickup Pincode"
                      component={Input}
                    />
                  </FormItem>

                  <FormItem
                    label="Pickup city"
                    invalid={errors.supplier_pincode && touched.supplier_pincode}
                    errorMessage={errors.supplier_pincode}
                  >
                    <Field
                      type="text"
                      autoComplete="off"
                      name="supplier_pincode"
                      placeholder="Pickup city "
                      component={Input}
                    />
                  </FormItem>

                 


                </div>
              </div>

              <div className=' border  rounded-md px-4 pt-2'>

                <h5 className="mb-4">Drop Address </h5>
                <div className="md:grid grid-cols-2 gap-x-4  ">
                <FormItem
                    label="Drop Contact Name"
                    invalid={errors.supplier_name && touched.supplier_name}
                    errorMessage={errors.supplier_name}
                  >
                    <Field
                      type="text"
                      autoComplete="off"
                      name="supplier_name"
                      placeholder="Drop Contact Name"
                      component={Input}
                    />
                  </FormItem>
                  <FormItem
                    label="Drop Mobile"
                    invalid={errors.supplier_mobile && touched.supplier_mobile}
                    errorMessage={errors.supplier_mobile}
                  >
                    <Field
                      type="text"
                      autoComplete="off"
                      name="supplier_mobile[0]"
                      placeholder="Drop Mobile"
                      component={Input}
                    />
                  </FormItem>

                  <FormItem
                    label="Drop Address"
                    invalid={errors.supplier_address && touched.supplier_address}
                    errorMessage={errors.supplier_address}
                  >
                    <Field
                      type="text"
                      autoComplete="off"
                      name="supplier_address[0]"
                      placeholder="Drop Address"
                      component={Input}
                    />
                  </FormItem>

                  <FormItem
                    label="Drop Pincode"
                    invalid={errors.supplier_city && touched.supplier_city}
                    errorMessage={errors.supplier_city}
                  >
                    <Field
                      type="text"
                      autoComplete="off"
                      name="supplier_city"
                      placeholder="Drop Pincode"
                      component={Input}
                    />
                  </FormItem>

                  <FormItem
                    label="Drop city"
                    invalid={errors.supplier_pincode && touched.supplier_pincode}
                    errorMessage={errors.supplier_pincode}
                  >
                    <Field
                      type="text"
                      autoComplete="off"
                      name="supplier_pincode"
                      placeholder="Drop city "
                      component={Input}
                    />
                  </FormItem>


                </div>
              </div>
            </div>

            <div className="flex mt-2 justify-end gap-2">
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

