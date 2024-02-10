import React, { forwardRef } from 'react'
import { Tabs, FormContainer } from '../../components/ui'
import { Form, Formik } from 'formik'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import * as Yup from 'yup'
// import PersonalInfoForm from './PersonalInfoForm'
// import SocialLinkForm from './PasswordForm'
import PasswordForm from './PasswordForm'

dayjs.extend(customParseFormat)

const validationSchema = Yup.object().shape({
    password: Yup.string().required('Please enter your password'),
    cPassword: Yup.string().oneOf(
        [Yup.ref('password'), null],
        'Your passwords do not match'
    ).required('Confirm password required'),
})

const { TabNav, TabList, TabContent } = Tabs

const EmployeeForm = forwardRef((props, ref) => {
    const { customer, onFormSubmit } = props
    console.log(customer);

    return (
        <Formik
            innerRef={ref}
            initialValues={{
                password: customer?.password || '',
                cPassword: customer?.cPassword || ''
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                onFormSubmit?.(values)
                setSubmitting(false)
            }}
        >
            {({ touched, errors, resetForm }) => (
                <Form>
                    <FormContainer>
                        <Tabs defaultValue="password">
                            <TabList>
                                {/* <TabNav value="personalInfo">
                                    Personal Info
                                </TabNav>
                                <TabNav value="social">Social</TabNav> */}
                                <TabNav value="password">Change password</TabNav>
                            </TabList>
                            <div className="p-6">
                                {/* <TabContent value="personalInfo">
                                    <PersonalInfoForm
                                        touched={touched}
                                        errors={errors}
                                    />
                                </TabContent>
                                <TabContent value="social">
                                    <SocialLinkForm
                                        touched={touched}
                                        errors={errors}
                                    />
                                </TabContent> */}
                                <TabContent value="password">
                                    <PasswordForm
                                        touched={touched}
                                        errors={errors}
                                    />
                                </TabContent>
                            </div>
                        </Tabs>
                    </FormContainer>
                </Form>
            )}
        </Formik>
    )
})

export default EmployeeForm
