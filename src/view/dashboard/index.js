import React from 'react'
import reducer from './store'
import { injectReducer } from '../../store'
import AdminDashboardHeader from './components/AdminDashboardHeader'
import BotherAdminDashboard from './components/BotherAdminDashboard'

injectReducer('salesDashboard', reducer)

const Dashboard = () => {
    return (
        <div className="flex flex-col gap-4 h-full">
            <AdminDashboardHeader />
            <BotherAdminDashboard />
        </div>
    )
}

export default Dashboard
