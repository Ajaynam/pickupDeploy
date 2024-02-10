import { Field, Form } from 'formik'
import React, { useCallback, useEffect, useState } from 'react'
import { Button, FormContainer, FormItem, Input } from '../../../components/ui'

const AddressForm = ({ data, type, onEdit, touched,
    errors,
    isSubmitting }) => {
    const [editData, setEditData] = useState(data)
    const [loading,setLoading]= useState(false)
    useEffect(() => {
        setEditData(data)
        setLoading(isSubmitting)
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, type, onEdit,isSubmitting])

    const editForm = useCallback(() => {
        return (
            <Form>
                <FormContainer>
                    <FormItem
                        invalid={errors.name && touched.name}
                        errorMessage={errors.name}
                    >
                        <Field
                            style={{ marginBottom: 0 }}
                            type="text"
                            autoComplete="off"
                            name="name"
                            placeholder="name"
                            component={Input}

                        />
                    </FormItem>
                    {type === 'edit' ?
                        <div className='md:grid grid-cols-2 gap-4'>
                            <Button
                                block
                                loading={loading}
                                variant="solid"
                                type="submit"
                                role='button'
                                className='mt-0'
                            >
                                {loading ? 'Updating...' : 'Update'}
                            </Button>
                            <Button
                                block
                                variant="solid"
                                type="submit"
                                role='button'
                                className='mt-0'
                                onClick={() => {
                                    onEdit()
                                }}
                            >
                                new
                            </Button>
                        </div>
                        :
                        <Button
                            block
                            loading={loading}
                            variant="solid"
                            type="submit"
                            // role='button'
                            className='mt-0'
                        >
                            {loading ? 'please wait...' : 'Create'}
                        </Button>
                    }
                </FormContainer>
            </Form>
        )
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type, editData])

    return (
        editForm()
    )
}

export default AddressForm
