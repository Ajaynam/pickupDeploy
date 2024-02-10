


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
  import { creatematerialGrade } from '../../store/dataSlice';
  import { useDispatch } from 'react-redux';
  
  const validationSchema = Yup.object().shape({
    material_grade_number: Yup.string().required('Customer name Required'),
  });
  
  const data = {
    material_grade_number: '',
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
  
  
  
          let action = await dispatch(creatematerialGrade({ ...values }));
          let notificationWithAvatar;
  
          if (action?.payload?.status < 400) {
            notificationWithAvatar = (
              <Notification title={values?.material_grade_number}>
                {action?.payload?.data?.message}
              </Notification>
            );
            console.log(action.payload.data.message)
            // navigate('/shop/list');
          } else {
            notificationWithAvatar = (
              <Notification title={values?.material_grade_number} type="danger">
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
                  invalid={errors.material_grade_number && touched.material_grade_number}
                  errorMessage={errors.material_grade_number}
                >
                  <Field
                    type="text"
                    autoComplete="off"
                    name="material_grade_number"
                    placeholder="Customer Name"
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
  
  