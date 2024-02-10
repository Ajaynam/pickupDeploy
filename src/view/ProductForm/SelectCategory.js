import React, { useEffect } from 'react'
import { AdaptableCard } from '../../components/shared'
import { Input, FormItem, Select } from '../../components/ui'
import CreatableSelect from 'react-select/creatable'
import { Field } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategoryList } from './store/dataSlice'



const SelectCategory = (props) => {
    const { values, touched, errors } = props

    const dispatch = useDispatch()
    const fetchCategoryList = () => {
        dispatch(getAllCategoryList())
    }


    useEffect(() => {
        fetchCategoryList()
    }, [])

    const categoriesData = useSelector((state) => state.productForm.data.categoryList);

    const categories = categoriesData.map((item) => ({ label: item.name, value: item.id }));

   

    return (
        <AdaptableCard className="" divider isLastChild>
            <h5>Category</h5>
            <p className="mb-6">Please Select Category</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">
                    <FormItem
                        label="Category"
                        invalid={errors.category && touched.category}
                        errorMessage={errors.category}
                    >
                        <Field name="category">
                            {({ field, form }) => (
                                <Select
                                    field={field}
                                    form={form}
                                    options={categories}
                                    value={categories.filter(
                                        (category) =>
                                            category.value === values.category
                                    )}
                                    onChange={(option) =>
                                        form.setFieldValue(
                                            field.name,
                                            option.value
                                        )
                                    }
                                />
                            )}
                        </Field>
                    </FormItem>
                </div>
                <div className="col-span-1">
                    {/* <FormItem
                        label="Brand"
                        invalid={errors.brand && touched.brand}
                        errorMessage={errors.brand}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="brand"
                            placeholder="Brand"
                            component={Input}
                        />
                    </FormItem> */}
                </div>
            </div>
        </AdaptableCard>
    )
}

export default SelectCategory
