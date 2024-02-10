import React from 'react'
import { Button } from '../../../components/ui'
import {HiPlusCircle } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import EmployeeTableSearch from './EmployeeTableSearch'


const EmployeeTableTools = () => {
    // const categoriesData = useSelector((state) => state.productList.data.categories)
    // const categories = [
    //     { value: "", label: "All" },
    //     ...categoriesData.map((item) => ({ label: item.name, value: item.name }))
    // ];

    return (
        <div className="flex flex-col lg:flex-row gap-2 lg:items-center">
            <EmployeeTableSearch />
            {/* <Select
                options={categories}
                size='small'
                placeholder='Filter'
                onChange={(value) => dispatch(setFilterData(value.value))}
            /> */}
            <Link
                className="block lg:inline-block md:mx-2 md:mb-0 mb-4"
                to="/data/product-list.csv"
                target="_blank"
                download
            >
                {/* <Button block size="sm" icon={<HiDownload />}>
                    Export
                </Button> */}
            </Link>
            <Link
                className="block lg:inline-block md:mb-0 mb-4"
                to="/employee/new"
            >
                <Button block variant="solid" size="sm" icon={<HiPlusCircle />}>
                    Add Employee
                </Button>
            </Link>
        </div>
    )
}

export default EmployeeTableTools
