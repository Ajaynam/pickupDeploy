import React, { useEffect, useMemo } from 'react'
import { FormItem, Select } from '../../../components/ui'
import { Field, } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedShopDetails } from '../store/dataSlice'


const gstOptions = [
  { label: 'GST', value: true },
  { label: 'NON GST', value: false }
]


const NewOrderForm = (props) => {
  const { touched, errors, values } = props
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(setSelectedShopDetails(values.shopId))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values?.shopId])

  const shop = useSelector(state => state.adminNewOrder.data.shopList)
  const category = useSelector(state => state.adminNewOrder.data.categoryList)

  const shops = useMemo(() => {
    return shop.map((item) => {
      return { label: <span className='capitalize'>{item.name}</span>, value: item.id }
    })
  }, [shop])

  const categories = useMemo(() => {
    return category.map((item) => {
      return { label: <span className='capitalize'>{item.name}</span>, value: { id: item.id, name: item.name } }
    })
  }, [category])


  return (
    <div className="md:grid grid-cols-3 gap-4">
      <FormItem
        label="Shop"
        invalid={
          errors.shopId &&
          touched.shopId
        }
        errorMessage={errors.shopId}
      >
        <Field name="shopId">
          {({ field, form }) => (
            <Select
              placeholder="Shop"
              field={field}
              form={form}
              options={shops}
              value={shops.filter(
                (status) =>
                  status.value ===
                  values.shopId
              )}
              onChange={(status) =>
                form.setFieldValue(
                  field.name,
                  status.value
                )
              }
            />
          )}
        </Field>
      </FormItem>
      <FormItem
        label="GST type"
        invalid={
          errors.gst &&
          touched.gst
        }
        errorMessage={errors.gst}
      >
        <Field name="gst">
          {({ field, form }) => (
            <Select
              placeholder="GST type"
              field={field}
              form={form}
              options={gstOptions}
              value={gstOptions.filter(
                (status) =>
                  status.value ===
                  values.gst
              )}
              onChange={(status) =>
                form.setFieldValue(
                  field.name,
                  status.value
                )
              }
            />
          )}
        </Field>
      </FormItem>
      <FormItem
        label="Category"
        invalid={
          errors.category &&
          touched.category
        }
        errorMessage={errors.category}
      >
        <Field name="category">
          {({ field, form }) => (
            <Select
              placeholder="Category"
              field={field}
              form={form}
              options={categories}
              value={categories.filter(
                (status) =>
                  status.value ===
                  values.category
              )}
              onChange={(status) =>
                form.setFieldValue(
                  field.name,
                  status.value
                )
              }
            />
          )}
        </Field>
      </FormItem>
    </div>
  )
}

export default NewOrderForm