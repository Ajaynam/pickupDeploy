


// import React, { useState } from 'react';
// import axios from 'axios';
// import * as Yup from 'yup';
// import { useFormik } from 'formik';

// import './PersonalInformation.css'; // Import the CSS file
// // import {  } from '../../../components/ui';
// import { Button , Input, Notification,  Toast} from '../../../../components/ui';

// const PersonalInformation = () => {
//     const handleSubmit = async (values) => {
//         try {
//             const response = await axios.post('https://brother-industries.onrender.com/api/v1/web/pattern/register', values);

//             if (response.status < 400) {
//                 console.log(response);
//                 Toast.push(
//                     <Notification title="Details Updated" type="success">
//                         pattern number created successfully.
//                     </Notification>
//                 );
//             } else {
//                 Toast.push(
//                     <Notification title="Update Failed" type="danger">
//                         Unable to create an pattern number. Please try again later.
//                     </Notification>
//                 );
//             }
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };

//     const validationSchema = Yup.object().shape({
//         pattern_number: Yup.string().required('Pattern number is required'),
//     });

//     const formik = useFormik({
//         initialValues: {
//             pattern_number: '',
//         },
//         validationSchema,
//         onSubmit: handleSubmit,
//     });

   
//     return (
//         <div className="form-container">
//             <h4 className="text-lg font-semibold mb-2">Unit Information</h4>
//             <p className="text-gray-500 mb-6">Basic information for creating an unit</p>
//             <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div className="form-group">
//                     <label htmlFor="pattern_number">Pattern number</label>
//                     <Input
//                         type="text"
//                         name="pattern_number"
//                         value={formik.values.pattern_number}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                     />
//                     {formik.touched.pattern_number && formik.errors.pattern_number && (
//                         <div className="error text-red-400">{formik.errors.pattern_number}</div>
//                     )}
//                 </div>
                
         
//                 <div className="mt-6">
//                     <Button variant="solid" className="" type="submit" disabled={formik.isSubmitting || !formik.isValid}>
//                         {formik.isSubmitting ? 'Submitting...' : 'Save'}
//                     </Button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default PersonalInformation;

// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { Button, Input, Notification, Toast } from '../../../../components/ui';
// import { createPattern } from '../../store/dataSlice'; // Update with the correct path

// const PersonalInformation = () => {
//     const dispatch = useDispatch();
//     // const loading = useSelector((state) => state.unit/data/loading);
//     const loading = useSelector((state) => state.unit);
//     console.log(loading);

//     const handleSubmit = async (values) => {
//         try {
//             await dispatch(createPattern(values));

//             Toast.push(
//                 <Notification title="Details Updated" type="success">
//                     Pattern number created successfully.
//                 </Notification>
//             );
//         } catch (error) {
//             Toast.push(
//                 <Notification title="Update Failed" type="danger">
//                     Unable to create a pattern number. Please try again later.
//                 </Notification>
//             );
//         }
//     };

//     const validationSchema = Yup.object().shape({
//         pattern_number: Yup.string().required('Pattern number is required'),
//     });

//     const formik = useFormik({
//         initialValues: {
//             pattern_number: '',
//         },
//         validationSchema,
//         onSubmit: handleSubmit,
//     });

//     return (
//         <div className="form-container">
//             <h4 className="text-lg font-semibold mb-2">Unit Information</h4>
//             <p className="text-gray-500 mb-6">Basic information for creating a unit</p>
//             <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div className="form-group">
//                     <label htmlFor="pattern_number">Pattern number</label>
//                     <Input
//                         type="text"
//                         name="pattern_number"
//                         value={formik.values.pattern_number}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                     />
//                     {formik.touched.pattern_number && formik.errors.pattern_number && (
//                         <div className="error text-red-400">{formik.errors.pattern_number}</div>
//                     )}
//                 </div>

//                 <div className="mt-6">
//                     <Button
//                         variant="solid"
//                         className=""
//                         type="submit"
//                         disabled={loading || !formik.isValid}
//                     >
//                         {loading ? 'Submitting...' : 'Save'}
//                     </Button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default PersonalInformation;


import {
    Input,
    Button,
    FormItem,
    FormContainer,
    Notification,
    Toast,
  } from '../../../../components/ui';
  import { Field, Form, Formik } from 'formik';
  import * as Yup from 'yup';
  import { useNavigate } from 'react-router-dom';
  import { createPattern } from '../../store/dataSlice';
  import { useDispatch } from 'react-redux';
  
  const validationSchema = Yup.object().shape({
    pattern_number: Yup.string().required('Customer name Required'),
  });
  
  const data = {
    pattern_number: '',
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
          
          setSubmitting(true);
  
  
  
          let action = await dispatch(createPattern({ ...values }));
          let notificationWithAvatar;
  
          if (action?.payload?.status < 400) {
            notificationWithAvatar = (
              <Notification title={values?.pattern_number}>
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
                <h3 className="mb-2">Add Pattern </h3>
                <p>Basic information </p>
              </div>
              <div className="md:grid grid-cols-3 gap-4">
                <FormItem
                  label="pattern number "
                  invalid={errors.pattern_number && touched.pattern_number}
                  errorMessage={errors.pattern_number}
                >
                  <Field
                    type="text"
                    autoComplete="off"
                    name="pattern_number"
                    placeholder="pattern number"
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
  
  