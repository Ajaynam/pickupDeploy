import React, { forwardRef } from 'react'
import { FormContainer, Button, Card } from '../../components/ui'
import { Form, Formik } from 'formik'
import ProductName from './ProductName'
import PricingFields from './PricingFields'
import SelectCategory from './SelectCategory'
import ProductImages from './ProductImages'
import cloneDeep from 'lodash/cloneDeep'
import { AiOutlineSave } from 'react-icons/ai'
import * as Yup from 'yup'
import { StickyFooter } from '../../components/shared'
import AddProductCategory from './AddCategory'
import { injectReducer } from '../../store'
import productFormReducer from './store'

injectReducer('productForm', productFormReducer)

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Product Name Required'),
    price: Yup.number().required('Price Required'),
    stock: Yup.number().required('Stock Required'),
    category: Yup.string().required('Category Required'),
})


const ProductForm = forwardRef((props, ref) => {
    const { type, initialData, onFormSubmit, onDiscard } = props

    return (
        <>
            <div>
                {/* {type === 'new' && <AddProductCategory />} */}
                <AddProductCategory />
                {/* {type === 'edit' && <AddProductStock productId={initialData?.id} />} */}
            </div>
            <Formik
                innerRef={ref}
                enableReinitialize={true}
                initialValues={{
                    ...initialData,
                    tags: initialData?.tags
                        ? initialData.tags.map((value) => ({
                            label: value,
                            value,
                        }))
                        : [],
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    const formData = cloneDeep(values)
                    if (type === 'new') {
                        if (formData.imgList.length > 0) {
                            formData.img = formData.imgList[0].img
                        }
                    }

                    onFormSubmit?.(formData, setSubmitting)
                }}
            >
                {({ values, touched, errors, isSubmitting }) => (
                    <Form>
                        <FormContainer>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                <div className="lg:col-span-2">
                                    <Card>
                                        <SelectCategory
                                            touched={touched}
                                            errors={errors}
                                            values={values}
                                        />
                                        <ProductName
                                            touched={touched}
                                            errors={errors}
                                            values={values}
                                        />
                                        <PricingFields
                                            touched={touched}
                                            errors={errors}
                                            values={values}
                                            type={type}
                                        />
                                    </Card>
                                </div>
                                <div className="lg:col-span-1">
                                    <Card>
                                        <ProductImages
                                            touched={touched}
                                            errors={errors}
                                            values={values}
                                            type={type}
                                        />
                                    </Card>
                                </div>
                            </div>
                            <StickyFooter
                                className="-mx-8 px-8 flex items-center justify-end py-4"
                                stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                            >

                                <div className="md:flex gap-2 items-center">
                                    <Button
                                        size="sm"
                                        className="ltr:mr-3 rtl:ml-3"
                                        onClick={() => onDiscard?.()}
                                        type="button"
                                    >
                                        Discard
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="solid"
                                        loading={isSubmitting}
                                        icon={<AiOutlineSave />}
                                        type="submit"
                                    >
                                        Save
                                    </Button>
                                </div>

                            </StickyFooter>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </>
    )
})

ProductForm.defaultProps = {
    type: 'edit',
    initialData: {
        name: '',
        // img: '',
        imgList: [],
        category: '',
        price: 0,
        stock: 0,
    },
}

export default ProductForm
