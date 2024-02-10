import React from 'react'
import { AdaptableCard } from '../../components/shared'
import { Input, FormItem } from '../../components/ui'
import { Field } from 'formik'
import { NumericFormat } from 'react-number-format'

const PriceInput = (props) => {
    return <Input {...props} value={props.field.value} prefix="₹" />
}

const NumberInput = (props) => {
    return <Input {...props} value={props.field.value} />
}


const NumberFormatInput = ({ onValueChange, ...rest }) => {
    return (
        <NumericFormat
            customInput={Input}
            type="text"
            onValueChange={onValueChange}
            autoComplete="off"
            {...rest}
        />
    )
}

const PricingFields = (props) => {
    const { touched, errors,type } = props

    return (
        <AdaptableCard className="mb-4" >
            <h5>Pricing</h5>
            <p className="mb-6">Product Stock and Price</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">
                    <FormItem
                        label="Stock"
                        invalid={errors.stock && touched.stock}
                        errorMessage={errors.stock}
                    >
                        <Field name="stock">
                            {({ field, form }) => {
                                return (
                                    <NumberFormatInput
                                        form={form}
                                        field={field}
                                        placeholder="Stock"
                                        customInput={NumberInput}
                                        onValueChange={(e) => {
                                            form.setFieldValue(
                                                field.name,
                                                e.value
                                            )
                                        }}
                                    />
                                )
                            }}
                        </Field>
                    </FormItem>
                </div>
                <div className="col-span-1">
                    <FormItem
                        label="Price"
                        invalid={errors.price && touched.price}
                        errorMessage={errors.price}
                    >
                        <Field name="price">
                            {({ field, form }) => {
                                return (
                                    <NumberFormatInput
                                        form={form}
                                        field={field}
                                        placeholder="Price"
                                        customInput={PriceInput}
                                        onValueChange={(e) => {
                                            form.setFieldValue(
                                                field.name,
                                                e.value
                                            )
                                        }}
                                    />
                                )
                            }}
                        </Field>
                    </FormItem>
                </div>
            </div>
        </AdaptableCard>
    )
}

export default PricingFields
