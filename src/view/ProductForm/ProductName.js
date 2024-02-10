import React from 'react'
import { AdaptableCard, RichTextEditor } from '../../components/shared'
import { Input, FormItem } from '../../components/ui'
import { Field } from 'formik'


const ProductName = (props) => {
    const { touched, errors } = props

    return (
        <AdaptableCard className="mb-4" divider>
            <h5>Product Information</h5>
            <p className="mb-6">basic product information</p>
            <FormItem
                label="Product Name"
                invalid={errors.name && touched.name}
                errorMessage={errors.name}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="name"
                    placeholder="Name"
                    component={Input}
                />
            </FormItem>
            {/* <FormItem
                label="Description"
                labelClass="!justify-start"
                invalid={errors.description && touched.description}
                errorMessage={errors.description}
            >
                <Field name="description">
                    {({ field, form }) => (
                        <RichTextEditor
                            value={field.value}
                            onChange={(val) =>
                                form.setFieldValue(field.name, val)
                            }
                        />
                    )}
                </Field>
            </FormItem> */}
        </AdaptableCard>
    )
}

export default ProductName
