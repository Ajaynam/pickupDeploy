import React from 'react'
import { FormItem } from '../../components/ui'
import { Field } from 'formik'
import { PasswordInput } from '../../components/shared'

const PasswordForm = (props) => {
    const { touched, errors } = props

    return (
        <>
            <FormItem
                label="Password"
                invalid={errors.password && touched.password}
                errorMessage={errors.password}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="password"
                    placeholder="Password"
                    component={PasswordInput}
                />
            </FormItem>
            <FormItem
                label="Confirm password"
                invalid={errors.cPassword && touched.cPassword}
                errorMessage={errors.cPassword}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="cPassword"
                    placeholder="Re-enter password"
                    component={PasswordInput}
                />
            </FormItem>
        </>
    )
}

export default PasswordForm
