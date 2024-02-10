import React, { useEffect, useState } from 'react'
import useQuery from '../../utils/hooks/useQuery'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsDetailsByProductId, putProductsDetailsByProductId } from './store/dataSlice'
import isEmpty from 'lodash/isEmpty'
import { injectReducer } from '../../store'
import ProductDetailsReducer from './store'
import ProductForm from '../ProductForm'
import { useNavigate } from 'react-router-dom'
import { Loading } from '../../components/shared'
import appConfig from '../../configs/app.config'

injectReducer('productDetails', ProductDetailsReducer)

const ProductDetails = () => {
    const dispatch = useDispatch()
    const query = useQuery()
    const navigate = useNavigate()
    const productId = query.get('id')
    const [transformedData, setTransformedData] = useState(null);



    const fetchProduct = async () => {
        const action = await dispatch(getProductsDetailsByProductId({ productId }))
        if (action.payload.data) {
            const { data } = action.payload
            setTransformedData({
                id: data?.data?.id?.toString(),
                name: data?.data?.name,
                img: data?.data?.image[0]?.filename,
                imgList: data?.data?.image.map((image, index) => ({
                    id: image?.id,
                    name: `image-${index + 1}`,
                    img: appConfig.apiPrefix + image?.filename,
                    productId: productId
                })),
                category: data?.data?.category?.id,
                price: data?.data?.stock?.price,
                stock: data?.data?.stock?.pending,
                status: data?.data?.stock?.status === "instock" ? 0 : 1,
                brand: null,
                description: null
            });
        }
    }

    useEffect(() => {
        fetchProduct()
    }, [productId]);

    const productsState = useSelector((state) => state.productDetails.data)

    const loading = productsState.loading




    const handleFormSubmit = async (values, setSubmitting) => {
        setSubmitting(true)
        console.log(values);
        // const formData = new FormData();
        // formData.append('categoryId', values.category);
        // formData.append('name', values.name);
        // formData.append('quantity', Number(values.stock));
        // formData.append('price', Number(values.price));
        const success = await dispatch(putProductsDetailsByProductId(values))
        setSubmitting(false)
        // if (success) {
        //     popNotification('updated')
        // }
        alert('pass')
    }

    const handleDiscard = () => {
        navigate('/product/list')
    }





    return (
        <>
            <Loading loading={loading} >
                {!isEmpty(transformedData) && (
                    <ProductForm
                        type="edit"
                        initialData={transformedData}
                        onFormSubmit={handleFormSubmit}
                        onDiscard={handleDiscard}

                    />

                )}
            </Loading>
        </>
    )
}

export default ProductDetails