import React, { useEffect } from 'react'
import { Loading } from '../../../components/shared'
import Statistic from './Statistic'
import SalesReport from './SalesReport'
import SalesByCategories from './SalesByCategories'
import TopProduct from './TopProduct'
import { getChartData, getAllProduct } from '../store/dataSlice'
import { useDispatch, useSelector } from 'react-redux'
import LatestLedger from './LatestLedger'

const BotherAdminDashboard = () => {
    const dispatch = useDispatch()
    const {
        statisticData, salesReportData, topProductsData, ledgerData, salesByCategoriesData
    } = useSelector((state) => state.salesDashboard.data.productData);
    
    const productData = useSelector((state) => state.salesDashboard.data.productData);


    
    console.log("data1" ,productData)
    const loading = useSelector((state) => state.salesDashboard.data.loading)

    useEffect(() => {
        fetchData()
        fetchProductData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchData = () => {
        dispatch(getChartData())
    }

    const fetchProductData = () => {
        dispatch(getAllProduct())
    }
    return (
        <Loading loading={loading}>
            <Statistic data={productData} />
            {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <SalesReport data={salesReportData} className="col-span-2" />
                <SalesByCategories data={salesByCategoriesData} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <LatestLedger data={ledgerData} className="lg:col-span-2" />
                <TopProduct data={topProductsData} />
            </div> */}
        </Loading>
    )
}

export default BotherAdminDashboard
