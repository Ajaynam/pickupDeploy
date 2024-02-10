
import React, { useState } from 'react'
import { FormItem, Upload } from '../../../components/ui'
import { Field } from 'formik'



const DocumentUploadField = (props) => {
    const { label, name, children, touched, errors } = props
    const [file, setFile] = useState('')
    const onSetFormFile = (form, field, file) => {
        setFile(URL.createObjectURL(file[0]))
        form.setFieldValue(field.name, file[0])
    }

    return (
        <FormItem
            label={label}
            invalid={errors[name] && touched[name]}
            errorMessage={errors[name]}
        >
            <Field name={name}>
                {({ field, form }) => (
                    <Upload
                        draggable
                        className="cursor-pointer h-[300px]"
                        onChange={(files) => onSetFormFile(form, field, files)}
                        onFileRemove={(files) =>
                            onSetFormFile(form, field, files)
                        }
                        showList={false}
                        uploadLimit={1}
                    >
                        {field.value ? (
                            <img
                                className="p-3 max-h-[300px]"
                                src={file}
                                alt=""
                            />
                        ) : (
                            <div className="text-center">
                                {children}
                                <p className="font-semibold">
                                    <span className="text-gray-800 dark:text-white">
                                        Drop your image here, or{' '}
                                    </span>
                                    <span className="text-blue-500">
                                        browse
                                    </span>
                                </p>
                                <p className="mt-1 opacity-60 dark:text-white">
                                    Support: jpeg, png
                                </p>
                            </div>
                        )}
                    </Upload>
                )}
            </Field>
        </FormItem>
    )
}


export default DocumentUploadField