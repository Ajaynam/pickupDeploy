import React, { useState, Suspense, lazy } from 'react'
import { Tabs } from '../../components/ui'
import { AdaptableCard, Container } from '../../components/shared'

import { useSelector } from 'react-redux'


const Profile = lazy(() => import('./components/Profile'))
const Password = lazy(() => import('./components/Password'))


const { TabNav, TabList } = Tabs

const settingsMenu = {
    profile: { label: 'Profile', path: 'profile' },
    password: { label: 'Password', path: 'password' },
  
}

const Settings = () => {
    const [currentTab, setCurrentTab] = useState('profile')
     

    const profileData = useSelector((state)=>state.auth.user)


    const onTabChange = (val) => {
        setCurrentTab(val)
    }

   
  

    return (
        <Container>
            <AdaptableCard>
                <Tabs value={currentTab} onChange={(val) => onTabChange(val)}>
                    <TabList>
                        {Object.keys(settingsMenu).map((key) => (
                            <TabNav key={key} value={key}>
                                {settingsMenu[key].label}
                            </TabNav>
                        ))}
                    </TabList>
                </Tabs>
                <div className="px-4 py-6">
                    <Suspense fallback={<></>}>
                        {currentTab === 'profile' && (
                            <Profile data={profileData} />
                        )}
                        {currentTab === 'password' && (
                            <Password />
                        )}
                      
                    </Suspense>
                </div>
            </AdaptableCard>
        </Container>
    )
}



export default Settings
