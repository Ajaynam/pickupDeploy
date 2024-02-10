// import React from 'react'
// import {
//     Input,
//     Button,
//     Checkbox,
//     FormItem,
//     FormContainer,
//     Alert,
// } from '../../../components/ui'
// import { PasswordInput, ActionLink } from '../../../components/shared'
// import useTimeOutMessage from '../../../utils/hooks/useTimeOutMessage'
// import { Field, Form, Formik } from 'formik'
// import * as Yup from 'yup'
// import useAuth from '../../../utils/hooks/useAuth'

// const validationSchema = Yup.object().shape({
//     username: Yup.string().required('Please enter your username'),
//     password: Yup.string().required('Please enter your password'),
//     rememberMe: Yup.bool(),
// })

// const SignInForm = (props) => {
//     const {
//         disableSubmit = false,
//         className,
//         forgotPasswordUrl = '/reset-password',
//     } = props

//     const [message, setMessage] = useTimeOutMessage()

//     const { signIn } = useAuth()

//     const onSignIn = async (values, setSubmitting) => {
//         setSubmitting(true)

//         const result = await signIn(values)

//         if (result.status === 'failed') {
//             setMessage(result.message)
//         }

//         setSubmitting(false)
//     }

//     return (
//         <div className={className}>
//             {message && (
//                 <Alert className="mb-4" type="danger" showIcon>
//                     {message}
//                 </Alert>
//             )}
//             <Formik
//                 initialValues={{
//                     username: '',
//                     password: '',
//                     rememberMe: true,
//                 }}
//                 validationSchema={validationSchema}
//                 onSubmit={(values, { setSubmitting }) => {
//                     if (!disableSubmit) {
//                         onSignIn(values, setSubmitting)
//                     } else {
//                         setSubmitting(false)
//                     }
//                 }}
//             >
//                 {({ touched, errors, isSubmitting }) => (
//                     <Form>
//                         <FormContainer>
//                             <FormItem
//                                 label="username"
//                                 invalid={errors.username && touched.username}
//                                 errorMessage={errors.username}
//                             >
//                                 <Field
//                                     type="text"
//                                     autoComplete="off"
//                                     name="username"
//                                     placeholder="Username"
//                                     component={Input}
//                                 />
//                             </FormItem>
//                             <FormItem
//                                 label="Password"
//                                 invalid={errors.password && touched.password}
//                                 errorMessage={errors.password}
//                             >
//                                 <Field
//                                     autoComplete="off"
//                                     name="password"
//                                     placeholder="Password"
//                                     component={PasswordInput}
//                                 />
//                             </FormItem>
//                             <div className="flex justify-between mb-6">
//                                 <Field
//                                     className="mb-0"
//                                     name="rememberMe"
//                                     component={Checkbox}
//                                     children="Remember Me"
//                                 />
//                                 <ActionLink to={forgotPasswordUrl}>
//                                     Forgot Password?
//                                 </ActionLink>
//                             </div>
//                             <Button
//                                 block
//                                 loading={isSubmitting}
//                                 variant="solid"
//                                 type="submit"
//                             >
//                                 {isSubmitting ? 'Signing in...' : 'Sign In'}
//                             </Button>
//                         </FormContainer>
//                     </Form>
//                 )}
//             </Formik>
//         </div>
//     )
// }

// export default SignInForm


import React from 'react'
import {
    Input,
    Button,
    Checkbox,
    FormItem,
    FormContainer,
    Alert,
} from '../../../components/ui'
import { PasswordInput, ActionLink } from '../../../components/shared'
import useTimeOutMessage from '../../../utils/hooks/useTimeOutMessage'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import useAuth from '../../../utils/hooks/useAuth'

const validationSchema = Yup.object().shape({
    username: Yup.string().required('Please enter your username'),
    password: Yup.string().required('Please enter your password'),
    role: Yup.string().required('Please enter your role'),
    rememberMe: Yup.bool(),
})

const SignInForm = (props) => {
    const {
        disableSubmit = false,
        className,
        forgotPasswordUrl = '/reset-password',
    } = props

    const [message, setMessage] = useTimeOutMessage()

    const { signIn } = useAuth()

    const onSignIn = async (values, setSubmitting) => {
        setSubmitting(true)

        const result = await signIn(values)

        if (result.status === 'failed') {
            setMessage(result.message)
        }

        setSubmitting(false)
    }

    return (
        <div className={className}>
            {message && (
                <Alert className="mb-4" type="danger" showIcon>
                    {message}
                </Alert>
            )}
            <Formik
                initialValues={{
                    role:'Admin',
                    username: '',
                    password: '',
                    rememberMe: true,
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    if (!disableSubmit) {
                        onSignIn(values, setSubmitting)
                    } else {
                        setSubmitting(false)
                    }
                }}
            >
                {({ touched, errors, isSubmitting }) => (
                    <Form>
                        <FormContainer>
                        <FormItem
                        disabled = {true}
                                label="role"
                                invalid={errors.role && touched.role}
                                errorMessage={errors.role}
                            >
                                <Field
                                disabled = {true}
                                    type="text"
                                    autoComplete="off"
                                    name="role"
                                    placeholder="role"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                label="username"
                                invalid={errors.username && touched.username}
                                errorMessage={errors.username}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="username"
                                    placeholder="Username"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                label="Password"
                                invalid={errors.password && touched.password}
                                errorMessage={errors.password}
                            >
                                <Field
                                    autoComplete="off"
                                    name="password"
                                    placeholder="Password"
                                    component={PasswordInput}
                                />
                            </FormItem>
                            <div className="flex justify-between mb-6">
                                <Field
                                    className="mb-0"
                                    name="rememberMe"
                                    component={Checkbox}
                                    children="Remember Me"
                                />
                                {/* <ActionLink to={forgotPasswordUrl}>
                                    Forgot Password?
                                </ActionLink> */}
                            </div>
                            <Button
                                block
                                loading={isSubmitting}
                                variant="solid"
                                type="submit"
                            >
                                {isSubmitting ? 'Signing in...' : 'Sign In'}
                            </Button>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default SignInForm
