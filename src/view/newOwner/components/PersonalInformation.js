import {
    Input,
    Button,
    FormItem,
    FormContainer,
    Notification,
    Select,
    Toast,
} from '../../../components/ui'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { DoubleSidedImage, PasswordInput } from '../../../components/shared'
import DocumentUploadField from './DocumentUploadField'
import { useNavigate } from 'react-router-dom'
import { getAdminCreateNewOwner } from '../store/dataSlice'
import { useDispatch } from 'react-redux'

const validationSchema = Yup.object().shape({

    name: Yup.string().required('Name Required'),
    ProductName: Yup.string().required('Product Name Required'),
    email: Yup.string().email('Invalid email'),
    ItemCode: Yup.string().required('Item Code Required '),
    unit: Yup.string().required('unit type is Required'),
    state: Yup.string().required('Please enter your state'),
    block: Yup.string().required('Please enter your block'),
    pincode: Yup.string().required('Please enter your pincode'),
    district: Yup.string().required('Please enter your district'),
    village: Yup.string().required('Please enter your village/town/city'),
    password: Yup.string().required('Please enter your password'),
    // image: Yup.string().required('Please upload your image'),
    cpassword: Yup.string().oneOf(
        [Yup.ref('password'), null],
        'Your passwords do not match'
    ).required('Password required'),
})

const ProductCategoryOptions = [
    { label: 'Finish Materia', value: true },
    { label: 'Raw Material', value: true },
    { label: 'Infrastructure', value: true },
    { label: 'Machine Tools', value: true },
]
const UnitOptions = [
    { label: 'Kg', value: true },
    { label: 'MM', value: true },
    // { label: 'Infrastructure', value: true },
    // { label: 'Machine Tools', value: true },
]


const data = {
    name: '',
    email: '',
    password: '',
    cpassword: '',
    state: '',
    district: '',
    ItemCode: '',
    village: '',
    block: '',
    image: '',
    pincode: ''
}
const PersonalInformation = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    return (
        <>
            <Formik
                initialValues={data}
                enableReinitialize={true}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting }) => {

                    setSubmitting(true)
                    // const form = new FormData()
                    // form.append('file', values.image)
                    // let image = await dispatch(uploadImage(form))
                    let action = await dispatch(getAdminCreateNewOwner({ ...values }))
                    let notificationWithAvatar
                    if (action?.payload?.status < 400) {
                        notificationWithAvatar = (
                            <Notification
                                title={values?.name}
                            // customIcon={
                            //     <Avatar shape="circle" src={appConfig.apiPrefix + image?.payload?.data?.filename} />
                            // }
                            >
                                {action?.payload?.data?.message}
                            </Notification>
                        )
                        navigate('/shop/list')
                    } else {
                        notificationWithAvatar = (
                            <Notification
                                title={values?.email}
                                type='danger'
                            >
                                {action?.payload?.data?.message}
                            </Notification>
                        )
                    }
                    Toast.push(notificationWithAvatar)
                    setSubmitting(false)
                }}
            >
                {({ values, touched, errors, isSubmitting }) => {
                    const validatedProps = { touched, errors }
                    return (
                        <Form>
                            <FormContainer>
                                <div className="mb-8">
                                    <h3 className="mb-2"> Information</h3>
                                    <p>Basic information  </p>
                                </div>
                                <div className="md:grid grid-cols-3 gap-4">
                                    <FormItem
                                        label="Customer/Supplier Name"
                                        invalid={errors.name && touched.name}
                                        errorMessage={errors.name}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="name"
                                            placeholder="Full name"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Product Name"
                                        invalid={errors.ProductName && touched.ProductName}
                                        errorMessage={errors.ProductName}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="ProductName"
                                            placeholder="Product name"
                                            component={Input}
                                        />
                                    </FormItem>
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
                                        label="Raw Code"
                                        invalid={errors.RawCode && touched.RawCode}
                                        errorMessage={errors.RawCode}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="RawCode"
                                            placeholder="Raw Code"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Pump Model"
                                        invalid={errors.PumpModel && touched.PumpModel}
                                        errorMessage={errors.PumpModel}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="PumpModel"
                                            placeholder="Pump Model"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Product Code"
                                        invalid={errors.ProductCode && touched.ProductCode}
                                        errorMessage={errors.ProductCode}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="ProductCode"
                                            placeholder="Product Code"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Drawing Number"
                                        invalid={errors.DrawingNumber && touched.DrawingNumber}
                                        errorMessage={errors.DrawingNumber}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="DrawingNumber"
                                            placeholder="Drawing Number"
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
                                        label="Pattern Number"
                                        invalid={errors.PatternNumber && touched.PatternNumber}
                                        errorMessage={errors.PatternNumber}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="PatternNumber"
                                            placeholder="Pattern Number"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Pattern Availability"
                                        invalid={errors.PatternAvailability && touched.PatternAvailability}
                                        errorMessage={errors.PatternAvailability}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="PatternAvailability"
                                            placeholder="Pattern Availability"
                                            component={Input}
                                        />
                                    </FormItem>
                                   

                                    <FormItem
                                        label="Product Category"
                                        invalid={
                                            errors.ProductCategory &&
                                            touched.ProductCategory
                                        }
                                        errorMessage={errors.ProductCategory}
                                    >
                                        <Field name="ProductCategory">
                                            {({ field, form }) => (
                                                <Select
                                                    placeholder="ProductCategory"
                                                    field={field}
                                                    form={form}
                                                    options={ProductCategoryOptions}
                                                    value={ProductCategoryOptions.filter(
                                                        (status) =>
                                                            status.value ===
                                                            values.ProductCategory
                                                    )}
                                                //   onChange={(status) =>
                                                //     form.setFieldValue(
                                                //       field.name,
                                                //       status.value
                                                //     )
                                                //   }
                                                />
                                            )}
                                        </Field>
                                    </FormItem>
                                    <FormItem
                                        label="Unit"
                                        invalid={
                                            errors.unit &&
                                            touched.unit
                                        }
                                        errorMessage={errors.unit}
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
                                                //   onChange={(status) =>
                                                //     form.setFieldValue(
                                                //       field.name,
                                                //       status.value
                                                //     )
                                                //   }
                                                />
                                            )}
                                        </Field>
                                    </FormItem>
                                    <FormItem
                                        label="Standard Lead Time (in Weeks)"
                                        invalid={errors.StandardLeadTime && touched.StandardLeadTime}
                                        errorMessage={errors.StandardLeadTime}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="StandardLeadTime"
                                            placeholder="Standard Lead Time"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Raw Weight"
                                        invalid={errors.RawWeight && touched.RawWeight}
                                        errorMessage={errors.RawWeight}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="RawWeight"
                                            placeholder="Raw Weight"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Finish Weight"
                                        invalid={errors.FinishWeight && touched.FinishWeight}
                                        errorMessage={errors.FinishWeight}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="FinishWeight"
                                            placeholder="Finish Weight"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Scrap Weight"
                                        invalid={errors.ScrapWeight && touched.ScrapWeight}
                                        errorMessage={errors.ScrapWeight}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="ScrapWeight"
                                            placeholder="Scrap Weight"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="HSN Code"
                                        invalid={errors.HSNCode && touched.HSNCode}
                                        errorMessage={errors.HSNCode}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="HSNCode"
                                            placeholder="HSN Code"
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>


                                <div className="mb-8 mt-6">
                                    <h3 className="mb-2">Attach Files</h3>
                                    <p></p>
                                </div>
                               
                            
                             <div className='md:grid grid-cols-3 gap-4'>
                             <DocumentUploadField
                                    name="image"
                                    label="Process Sheet"
                                    {...validatedProps}
                                >
                                    <DoubleSidedImage
                                        className="mx-auto mb-3"
                                        src="/img/thumbs/passport.png"
                                        darkModeSrc="/img/thumbs/passport-dark.png"
                                        alt=""
                                    />
                                </DocumentUploadField>
                                <DocumentUploadField
                                    name="image"
                                    label="Raw Drawing"
                                    {...validatedProps}
                                >
                                    <DoubleSidedImage
                                        className="mx-auto mb-3"
                                        src="/img/thumbs/passport.png"
                                        darkModeSrc="/img/thumbs/passport-dark.png"
                                        alt=""
                                    />
                                </DocumentUploadField>
                                <DocumentUploadField
                                    name="image"
                                    label="Finish Drawing"
                                    {...validatedProps}
                                >
                                    <DoubleSidedImage
                                        className="mx-auto mb-3"
                                        src="/img/thumbs/passport.png"
                                        darkModeSrc="/img/thumbs/passport-dark.png"
                                        alt=""
                                    />
                                </DocumentUploadField>
                             </div>

                                {/* <DocumentUploadField
                                    name="image"
                                    label="Profile image"
                                    {...validatedProps}
                                >
                                    <DoubleSidedImage
                                        className="mx-auto mb-3"
                                        src="/img/thumbs/passport.png"
                                        darkModeSrc="/img/thumbs/passport-dark.png"
                                        alt=""
                                    />
                                </DocumentUploadField> */}
                                <div className="flex justify-end gap-2">
                                    <Button
                                        loading={isSubmitting}
                                        variant="solid"
                                        type="submit"
                                    >
                                        {isSubmitting
                                            ? 'Please wait'
                                            : 'Register'}
                                    </Button>
                                </div>
                            </FormContainer>
                        </Form>
                    )
                }}
            </Formik>
        </>
    )
}

export default PersonalInformation
