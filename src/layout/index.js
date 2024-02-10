import React, { Suspense, useMemo } from 'react'
import { Loading } from '../components/shared'
import useAuth from '../utils/hooks/useAuth'
import { useSelector } from 'react-redux'

const Layout = () => {

    const { authenticated } = useAuth()
    // const authenticated=true
    const AppLayout = useMemo(() => {
        if (authenticated) {
            return React.lazy(() => import('./main'))
        }


        return React.lazy(() => import('./authLayout'))
    }, [authenticated])

    return (
        <Suspense
            fallback={
                <div className="flex flex-auto flex-col h-[100vh]">
                    <Loading loading={true} />
                </div>
            }
        >
            <AppLayout />
        </Suspense>
    )
}

export default Layout