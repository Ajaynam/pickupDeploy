import React, { Suspense } from 'react'
import ResetPasswordForm from './ResetPasswordForm'
import Auth from '../../../layout/authLayout/auth'
import { Loading } from '../../../components/shared'

const ResetPassword = () => {
    return (
        <Auth>
            <Suspense fallback={<Loading loading={true} />}>
                <ResetPasswordForm disableSubmit={false} />
            </Suspense>
        </Auth>
    )
}

export default ResetPassword
