import {
    Input,
    Button,
    FormItem,
    FormContainer,
    Notification,
    Toast
} from '../../../components/ui'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { PasswordInput } from '../../../components/shared'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addEmployee } from '../store/dataSlice'

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name Required'),
    email: Yup.string().email('Invalid email'),
    mobile: Yup.string().required('Please enter your phone number'),
    state: Yup.string().required('Please enter your state'),
    block: Yup.string().required('Please enter your block'),
    district: Yup.string().required('Please enter your district'),
    target: Yup.number().required('Monthly target is required'),
    village: Yup.string(),
    password: Yup.string().required('Please enter your password'),
    image: Yup.string(),
    cpassword: Yup.string().oneOf(
        [Yup.ref('password'), null],
        'Your passwords do not match'
    ).required('Password required'),
})

const data = {
    name: '',
    email: '',
    password: '',
    cpassword: '',
    state: '',
    district: '',
    mobile: '',
    village: '',
    block: '',
    image: '',
    target: ''
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
                    let action = await dispatch(addEmployee({ ...values }))
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
                        navigate('/employee/list')
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
                {({ touched, errors, isSubmitting }) => {
                    return (
                        <Form>
                            <FormContainer>
                                <div className="mb-8">
                                    <h4 className="mb-1">Personal Information</h4>
                                    <p>Basic information for an account opening</p>
                                </div>
                                <div className="md:grid grid-cols-2 gap-4">
                                    <FormItem
                                        label="Full name"
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
                                        label="Mobile"
                                        invalid={errors.mobile && touched.mobile}
                                        errorMessage={errors.mobile}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="mobile"
                                            placeholder="Mobile"
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>
                                <FormItem
                                    label="Email"
                                    invalid={errors.email && touched.email}
                                    errorMessage={errors.email}
                                >
                                    <Field
                                        type="email"
                                        autoComplete="off"
                                        name="email"
                                        placeholder="Email"
                                        component={Input}
                                    />
                                </FormItem>
                                <div className="md:grid grid-cols-2 gap-4">
                                    <FormItem
                                        label="Password"
                                        invalid={
                                            errors.password &&
                                            touched.password
                                        }
                                        errorMessage={errors.password}
                                    >
                                        <Field
                                            type="password"
                                            autoComplete="off"
                                            name="password"
                                            placeholder="Password"
                                            component={PasswordInput}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Confirm Password"
                                        invalid={errors.cpassword && touched.cpassword}
                                        errorMessage={errors.cpassword}
                                    >
                                        <Field
                                            type="password"
                                            autoComplete="off"
                                            name="cpassword"
                                            placeholder="Confirm password"
                                            component={PasswordInput}
                                        />
                                    </FormItem>
                                </div>
                                <div className="mb-8 mt-6">
                                    <h4 className="mb-1">Address Information</h4>
                                    <p>Your permanent address information for an account opening</p>
                                </div>
                                <div className="md:grid grid-cols-2 gap-4">
                                    <FormItem
                                        label="State"
                                        invalid={
                                            errors.state && touched.state
                                        }
                                        errorMessage={errors.state}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="state"
                                            placeholder="State"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="District"
                                        invalid={
                                            errors.district &&
                                            touched.district
                                        }
                                        errorMessage={errors.district}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="district"
                                            placeholder="District"
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>
                                <div className="md:grid grid-cols-2 gap-4">
                                    <FormItem
                                        label="Block"
                                        invalid={
                                            errors.block &&
                                            touched.block
                                        }
                                        errorMessage={errors.block}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="block"
                                            placeholder="Block"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Village/City/Town"
                                        invalid={
                                            errors.village &&
                                            touched.village
                                        }
                                        errorMessage={errors.village}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="village"
                                            placeholder="Village/City/Town"
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>
                                <div className="mb-8 mt-6">
                                    <h4 className="mb-1">Target Information</h4>
                                    <p>Employee monthly sales target information</p>
                                </div>
                                <div className="md:grid grid-cols-2 gap-4">
                                    <FormItem
                                        label="Target"
                                        invalid={
                                            errors.target && touched.target
                                        }
                                        errorMessage={errors.target}
                                    >
                                        <Field
                                            type="number"
                                            autoComplete="off"
                                            name="target"
                                            placeholder="Target"
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>
                                {/* <DocumentUploadField
                                    name="image"
                                    label="Employee image"
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
