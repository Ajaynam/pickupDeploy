import React, { useEffect } from 'react'
import { Button, Select } from '../../../components/ui'
import { HiPlusCircle } from 'react-icons/hi'
import ProductTableSearch from './ProductTableSearch'
// import ProductFilter from './ProductFilter'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategoryList, setFilterData } from '../store/dataSlice'

const ProductTableTools = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllCategoryList())
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const categoriesData = useSelector((state) => state.productList.data.categoryList)

    const categories = [
        { value: "", label: "All" },
        ...categoriesData.map((item) => ({ label: item.name, value: item.id }))
    ];


    return (
        <div className="flex flex-col lg:flex-row gap-2 lg:items-center">
            <ProductTableSearch />
            <Select
                options={categories}
                size='sm'
                placeholder='Filter'
                onChange={(value) => dispatch(setFilterData(value.value))}
            />
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
                to="/product/new"
            >
                <Button block variant="solid" size="sm" icon={<HiPlusCircle />}>
                    Add Product
                </Button>
            </Link>
        </div>
    )
}

export default ProductTableTools
