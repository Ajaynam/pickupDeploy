import React from 'react'
import { DatePicker, Button } from '../../../components/ui'
import { setStartDate, setEndDate } from '../store/stateSlice'
import { getChartData, getSalesDashboardData } from '../store/dataSlice'
import { HiOutlineFilter } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'

const dateFormat = 'MMM DD, YYYY'

const { DatePickerRange } = DatePicker

const AdminDashboardHeader = () => {
    const dispatch = useDispatch()

    const startingDate = useSelector(
        (state) => state.salesDashboard.state.startDate
    )
    const endingDate = useSelector((state) => state.salesDashboard.state.endDate)

    const handleDateChange = (value) => {
        dispatch(setStartDate(value[0]))
        dispatch(setEndDate(value[1]))
    }


    const onFilter = () => {
        const endDate = dayjs(startingDate).format('YYYY-MM-DD')
        const startDate = dayjs(endingDate).format('YYYY-MM-DD')
      
        dispatch(getChartData({ startDate, endDate }))
    }

    return (
        <div className="lg:flex items-center justify-between mb-4 gap-3">
            <div className="mb-4 lg:mb-0">
                <h3> Overview</h3>
                <p>View your current summary</p>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-center gap-3">
                <DatePickerRange
                    value={[startingDate, endingDate]}
                    onChange={handleDateChange}
                    inputFormat={dateFormat}
                    size="sm"
                />
                <Button size="sm" icon={<HiOutlineFilter />} onClick={onFilter}>
                    Filter
                </Button>
            </div>
        </div>
    )
}

export default AdminDashboardHeader
