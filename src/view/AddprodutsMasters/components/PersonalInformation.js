

import {
  Input,
  Button,
  FormItem,
  FormContainer,
  Notification,
  Toast,
} from '../../../components/ui';
import { DoubleSidedImage, PasswordInput } from '../../../components/shared'
import DocumentUploadField from './DocumentUploadField'
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { getAdminCreateProductMaster } from '../store/dataSlice';
import { useDispatch } from 'react-redux';


const validationSchema = Yup.object().shape({
  pattern_id: Yup.number().required('Pattern ID is required'),
  category_id: Yup.number().required('Category ID is required'),
  material_grade_id: Yup.number().required('Material Grade ID is required'),
  product_name: Yup.string().required('Product Name is required'),
  item_code: Yup.string(),
  row_code: Yup.string(),
  pump_model: Yup.string(),
  product_um: Yup.string().required('Product Unit of Measure is required'),
  hsn_code: Yup.string().required('HSN Code is required'),
  product_description: Yup.string().required('Product Description is required'),
  standard_time: Yup.string(),
  drawing_number: Yup.string().required('Drawing Number is required'),
  raw_weight: Yup.number().required('Raw Weight is required'),
  finish_weight: Yup.number().required('Finish Weight is required'),
  raw_drawing_attachment: Yup.string(),
  finish_drawing_attachment: Yup.string(),
  process_sheet_attachment: Yup.string(),
});

const data = {
  pattern_id: "",
  category_id: "",
  material_grade_id: "",
  product_name: '',
  item_code: '',
  row_code: '',
  pump_model: '',
  product_um: '',
  hsn_code: '',
  product_description: '',
  standard_time: '',
  drawing_number: '',
  raw_weight: "",
  finish_weight: "",
  raw_drawing_attachment: null,
  finish_drawing_attachment: null,
  process_sheet_attachment: null,
};

const PersonalInformation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={data}
      enableReinitialize={true}
      validationSchema={validationSchema}


      onSubmit={async (values, { setSubmitting, setFieldValue }) => {

        values.pattern_id = Number(values.pattern_id);
        values.category_id = Number(values.category_id);
        values.material_grade_id = Number(values.material_grade_id);
        values.raw_weight = Number(values.raw_weight);
        values.finish_weight = Number(values.finish_weight);
        setSubmitting(true);

        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
          if (value instanceof File) {
            formData.append(key, value);
          } else {
            formData.append(key, JSON.stringify(value));
          }
        });

        let action = await dispatch(getAdminCreateProductMaster({...values} , formData));
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


      {({ values, touched, errors, isSubmitting, setFieldValue }) => (
        <Form encType="multipart/form-data">
          <FormContainer>
            <div className="mb-8">
              <h3 className="mb-2">Product Information</h3>
              <p>Enter product details</p>
            </div>
            <div className="md:grid grid-cols-3 gap-4">
              <FormItem
                label="Pattern ID"
                invalid={errors.pattern_id && touched.pattern_id}
                errorMessage={errors.pattern_id}
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="pattern_id"
                  placeholder="Pattern ID"
                  component={Input}
                />
              </FormItem>
              <FormItem
                label="Category ID"
                invalid={errors.category_id && touched.category_id}
                errorMessage={errors.category_id}
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="category_id"
                  placeholder="Category ID"
                  component={Input}
                />
              </FormItem>

              <FormItem
                label="Material Grade ID"
                invalid={errors.material_grade_id && touched.material_grade_id}
                errorMessage={errors.material_grade_id}
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="material_grade_id"
                  placeholder="Material Grade ID"
                  component={Input}
                />
              </FormItem>

              <FormItem
                label="Product Name"
                invalid={errors.product_name && touched.product_name}
                errorMessage={errors.product_name}
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="product_name"
                  placeholder="Product Name"
                  component={Input}
                />
              </FormItem>


              <FormItem
                label="Item Code"
                invalid={errors.item_code && touched.item_code}
                errorMessage={errors.item_code}
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="item_code"
                  placeholder="Item Code"
                  component={Input}
                />
              </FormItem>

              <FormItem
                label="Row Code"
                invalid={errors.row_code && touched.row_code}
                errorMessage={errors.row_code}
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="row_code"
                  placeholder="Row Code"
                  component={Input}
                />
              </FormItem>

              <FormItem
                label="Pump Model"
                invalid={errors.pump_model && touched.pump_model}
                errorMessage={errors.pump_model}
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="pump_model"
                  placeholder="Pump Model"
                  component={Input}
                />
              </FormItem>

              <FormItem
                label="Product Unit of Measure"
                invalid={errors.product_um && touched.product_um}
                errorMessage={errors.product_um}
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="product_um"
                  placeholder="Product Unit of Measure"
                  component={Input}
                />
              </FormItem>

              <FormItem
                label="HSN Code"
                invalid={errors.hsn_code && touched.hsn_code}
                errorMessage={errors.hsn_code}
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="hsn_code"
                  placeholder="HSN Code"
                  component={Input}
                />
              </FormItem>

              <FormItem
                label="Product Description"
                invalid={errors.product_description && touched.product_description}
                errorMessage={errors.product_description}
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="product_description"
                  placeholder="Product Description"
                  component={Input}
                />
              </FormItem>

              <FormItem
                label="Standard Time"
                invalid={errors.standard_time && touched.standard_time}
                errorMessage={errors.standard_time}
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="standard_time"
                  placeholder="Standard Time"
                  component={Input}
                />
              </FormItem>

              <FormItem
                label="Drawing Number"
                invalid={errors.drawing_number && touched.drawing_number}
                errorMessage={errors.drawing_number}
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="drawing_number"
                  placeholder="Drawing Number"
                  component={Input}
                />
              </FormItem>
              {/* 
              <FormItem
                label="Raw Drawing Attachment"
                invalid={errors.raw_drawing_attachment && touched.raw_drawing_attachment}
                errorMessage={errors.raw_drawing_attachment}
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="raw_drawing_attachment"
                  placeholder="Raw Drawing Attachment"
                  component={Input}
                />
              </FormItem>

              <FormItem
                label="Finish Drawing Attachment"
                invalid={errors.finish_drawing_attachment && touched.finish_drawing_attachment}
                errorMessage={errors.finish_drawing_attachment}
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="finish_drawing_attachment"
                  placeholder="Finish Drawing Attachment"
                  component={Input}
                />
              </FormItem> */}
              {/* <DocumentUploadField
                name="image"
                label="Process Sheet"
                // {...validatedProps}
              >
                <DoubleSidedImage
                  className="mx-auto mb-3"
                  src="/img/thumbs/passport.png"
                  darkModeSrc="/img/thumbs/passport-dark.png"
                  alt=""
                />
              </DocumentUploadField> */}
              {/* 
              <FormItem
                label="Process Sheet Attachment"
                invalid={errors.process_sheet_attachment && touched.process_sheet_attachment}
                errorMessage={errors.process_sheet_attachment}
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="process_sheet_attachment"
                  placeholder="Process Sheet Attachment"
                  component={Input}
                />
              </FormItem> */}


              {/* <FormItem
                label="Raw Drawing Attachment"
                invalid={errors.raw_drawing_attachment && touched.raw_drawing_attachment}
                errorMessage={errors.raw_drawing_attachment}
              >
                <Field
                  type="file"
                  name="raw_drawing_attachment"
                  onChange={(event) => setFieldValue("raw_drawing_attachment", event.currentTarget.files[0])}
                />
              </FormItem>

              <FormItem
                label="Finish Drawing Attachment"
                invalid={errors.finish_drawing_attachment && touched.finish_drawing_attachment}
                errorMessage={errors.finish_drawing_attachment}
              >
                <Field
                  type="file"
                  name="finish_drawing_attachment"
                  onChange={(event) => setFieldValue("finish_drawing_attachment", event.currentTarget.files[0])}
                />
              </FormItem>

              <FormItem
                label="Process Sheet Attachment"
                invalid={errors.process_sheet_attachment && touched.process_sheet_attachment}
                errorMessage={errors.process_sheet_attachment}
              >
                <Field
                  type="file"
                  name="process_sheet_attachment"
                  onChange={(event) => setFieldValue("process_sheet_attachment", event.currentTarget.files[0])}
                />
              </FormItem> */}

              {/* <FormItem
                label="Raw Drawing Attachment"
                invalid={errors.raw_drawing_attachment && touched.raw_drawing_attachment}
                errorMessage={errors.raw_drawing_attachment}
              >
                <Field
                  type="file"
                  name="raw_drawing_attachment"
                  // onChange={(event) => setFieldValue("process_sheet_attachment", event.currentTarget.files[0])}
                  component={Input}
                />
              </FormItem>

              <FormItem
                label="Finish Drawing Attachment"
                invalid={errors.finish_drawing_attachment && touched.finish_drawing_attachment}
                errorMessage={errors.finish_drawing_attachment}
              >
                <Field
                  type="file"
                  name="finish_drawing_attachment"
                  component={Input}
                />
              </FormItem>

              <FormItem
                label="Process Sheet Attachment"
                invalid={errors.process_sheet_attachment && touched.process_sheet_attachment}
                errorMessage={errors.process_sheet_attachment}
              >
                <Field
                  type="file"
                  name="process_sheet_attachment"
                  component={Input}
                />
              </FormItem> */}



              <FormItem
                label="Raw Drawing Attachment"
                invalid={errors.raw_drawing_attachment && touched.raw_drawing_attachment}
                errorMessage={errors.raw_drawing_attachment}
              >
                <input
                  type="file"
                  name="raw_drawing_attachment"
                  onChange={(event) => setFieldValue('raw_drawing_attachment', event.currentTarget.files[0])}
                />
              </FormItem>

              <FormItem
                label="Finish Drawing Attachment"
                invalid={errors.finish_drawing_attachment && touched.finish_drawing_attachment}
                errorMessage={errors.finish_drawing_attachment}
              >
                <input
                  type="file"
                  name="finish_drawing_attachment"
                  onChange={(event) => setFieldValue('finish_drawing_attachment', event.currentTarget.files[0])}
                />
              </FormItem>

              <FormItem
                label="Process Sheet Attachment"
                invalid={errors.process_sheet_attachment && touched.process_sheet_attachment}
                errorMessage={errors.process_sheet_attachment}
              >
                <input
                  type="file"
                  name="process_sheet_attachment"
                  onChange={(event) => setFieldValue('process_sheet_attachment', event.currentTarget.files[0])}
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

