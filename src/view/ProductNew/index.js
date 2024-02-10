import React, { useEffect, useRef } from 'react'
import { Toast, Notification } from '../../components/ui'
import { useNavigate } from 'react-router-dom'
import ProductForm from '../ProductForm'
import { injectReducer } from '../../store'
import newProductReducer from './store'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategoryList } from './store/dataSlice'
import { apiAddProduct } from '../../services/ProductService'
// import { apiCreateSalesProduct } from '../../services/SalesService'


injectReducer('newProduct', newProductReducer)

const ProductNew = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const formikRef = useRef(null);
    const addProduct = async (data) => {
  
        const formData = new FormData();
        formData.append('categoryId', data.category);
        formData.append('name', data.name);
        formData.append('quantity', Number(data.stock));
        formData.append('price', Number(data.price));

        // Append each file to the formData
        for (let i = 0; i < data.imgList.length; i++) {
            formData.append('image', data.imgList[i].imgFile[0]);
        }

        const response = await apiAddProduct(formData)
        return response.data
    }


    const fetchCategoryList = () => {
        dispatch(getAllCategoryList())
    }


    useEffect(() => {
        fetchCategoryList()
    }, [])


    const handleFormSubmit = async (values, setSubmitting) => {
        setSubmitting(true)
        const action = await addProduct(values)
     
        setSubmitting(false)
        let notificationWithAvatar;
        if (action?.success===true) {
            notificationWithAvatar = (
                <Notification
                title={'Successfuly added'}
                type='success'
                >
                    {action?.message}
                </Notification>
            )
            if (formikRef.current) {
                formikRef.current.resetForm(); 
              }
              navigate('/product/list')
        
        } else {
            notificationWithAvatar = (
                <Notification
                    title={'Error'}
                    type='danger'
                >
                    {action?.message}
                </Notification>
            )
        }
        Toast.push(notificationWithAvatar)
       
    }


    const handleDiscard = () => {
        navigate('/product/list')
    }

    return (
        <>
            <ProductForm
                type="new"
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
            />
        </>
    )
}

export default ProductNew
