import {
    Input,
    Button,
    FormItem,
    FormContainer,
    Notification,
    Select,
    Toast,
    DatePicker,
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
    PONumber: Yup.string().required('PONumber  Required'),
    POSerialNumber: Yup.string().required('POSerial Number Required '),
    itemDescriptionOn: Yup.string().required('item DescriptionOn is Required'),
    ItemCode: Yup.string().required('Please enter your ItemCode'),
    DrawingNumber: Yup.string().required('Please enter your DrawingNumber'),
    Material: Yup.string().required('Please enter your Material'),
    POQuantity: Yup.string().required('Please enter your POQuantity'),
    DrawingRevision: Yup.string().required('Please enter your DrawingRevision'),
    PODeliveryDate: Yup.string().required('Please enter your PODeliveryDate'),
    BrothersConfirmDeliveryDate: Yup.string().required('Please enter your BrothersConfirmDeliveryDate'),
    ExWorkRFD: Yup.string().required('Please enter your ExWorkRFD'),
    RawPO: Yup.string().required('Please enter your RawPO'),
    RawCastingRequiredBy: Yup.string().required('Please enter your RawCastingRequiredBy'),
    SpecialQCRequirement: Yup.string().required('Please enter your SpecialQCRequirement'),
   
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
                                    <h3 className="mb-2"> PO Master Planner</h3>
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
                                        label="PO Number"
                                        invalid={errors.PONumber && touched.PONumber}
                                        errorMessage={errors.PONumber}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="PONumber"
                                            placeholder="PO Number "
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
                                   
                                    <FormItem
                                        label="item Description On "
                                        invalid={errors.itemDescriptionOn && touched.itemDescriptionOn}
                                        errorMessage={errors.itemDescriptionOn}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="itemDescriptionOn"
                                            placeholder="item Description On"
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
                                        label="Drawing  No."
                                        invalid={errors.DrawingNumber && touched.DrawingNumber}
                                        errorMessage={errors.DrawingNumber}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="DrawingNumber"
                                            placeholder="Drawing  No."
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Material"
                                        invalid={errors.Material && touched.Material}
                                        errorMessage={errors.Material}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="Material"
                                            placeholder="Material."
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
                                        label="PO Delivery Date"
                                        invalid={errors.PODeliveryDate && touched.PODeliveryDate}
                                        errorMessage={errors.PODeliveryDate}
                                    >
                                        <DatePicker
                                            type="text"
                                            autoComplete="off"
                                            name="PODeliveryDate"
                                            placeholder="PO Delivery Date"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Brothers Confirm Delivery Date"
                                        invalid={errors.BrothersConfirmDeliveryDate && touched.BrothersConfirmDeliveryDate}
                                        errorMessage={errors.BrothersConfirmDeliveryDate}
                                    >
                                        <DatePicker
                                            type="text"
                                            autoComplete="off"
                                            name="BrothersConfirmDeliveryDate"
                                            placeholder="Brothers Confirm Delivery Date"
                                            component={Input}
                                        />
                                    </FormItem>
                                    {/* <FormItem
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
                                                  onChange={(status) =>
                                                    form.setFieldValue(
                                                      field.name,
                                                      status.value
                                                    )
                                                  }
                                                />
                                            )}
                                        </Field> */}
                                    {/* </FormItem> */}

                                    <FormItem
                                        label="Ex Work RFD"
                                        invalid={errors.ExWorkRFD && touched.ExWorkRFD}
                                        errorMessage={errors.ExWorkRFD}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="ExWorkRFD"
                                            placeholder="Ex Work RFD "
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Raw PO "
                                        invalid={errors.RawPO && touched.RawPO}
                                        errorMessage={errors.RawPO}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="RawPO "
                                            placeholder="Raw PO  "
                                            component={Input}
                                        />
                                    </FormItem>


                                    <FormItem
                                        label="Raw casting required by  "
                                        invalid={errors.RawCastingRequiredBy  && touched.RawCastingRequiredBy}
                                        errorMessage={errors.RawCastingRequiredBy}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="Raw Casting Required By"
                                            placeholder="Raw Casting Required By "
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Special QC Requirement"
                                    invalid={errors.SpecialQCRequirement && touched.SpecialQCRequirement}
                                    errorMessage={errors.SpecialQCRequirement}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="SpecialQCRequirement"
                                            placeholder="Special QC Requirement"
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
                                        {isSubmitting
                                            ? 'Please wait'
                                            : 'Save'}
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
