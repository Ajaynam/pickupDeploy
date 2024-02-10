import React from 'react'

const authRoute = [
    {
        key: 'signUp',
        path: `/sign-up`,
        component: React.lazy(() => import('../../view/auth/signUp')),
        authority: [],
    },
    {
        key: 'signIn',
        path: `/sign-in`,
        component: React.lazy(() => import('../../view/auth/signIn')),
        authority: [],
    },
    {
        key: 'resetpassword',
        path: `/reset-password`,
        component: React.lazy(() => import('../../view/auth/ResetPassword')),
        authority: [],
    },
]

export default authRoute
