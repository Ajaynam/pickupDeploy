

import React, { useState, useEffect } from 'react'
import FormData from 'form-data'
import {
    Input,
    Button,
    FormItem,
    FormContainer,
    Notification,
    Select,
    Toast,
} from '../../../components/ui'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { DoubleSidedImage, PasswordInput } from '../../../components/shared'
import DocumentUploadField from './DocumentUploadField'
import { useNavigate } from 'react-router-dom'
import { getAdminCreateProductMaster, getCategorys, getmaterialGrades, uploadImage } from '../store/dataSlice'
import { getPatterns } from '../store/dataSlice';

import { useDispatch, useSelector } from 'react-redux'

const validationSchema = Yup.object().shape({

    // pattern_id: Yup.string().required('pattern_id Required'),
    // category_id: Yup.string().required('category_id Required'),
    // material_grade_id: Yup.string().required('material_grade_id Required'),
    // product_name: Yup.string().required('Product Name Required'),    ///
    // item_code: Yup.string().required('Item Code Required '),    ///
    // row_code: Yup.string().required('Raw Code is Required'),  ///
    // pump_model: Yup.string().required('Pump Model  is Required'), ///
    // product_description: Yup.string().required('product description  is Required'), ///
    // drawing_number: Yup.string().required('Drawing Number  is Required'),  ///
    // standard_time: Yup.string().required('Standard LeadTime  is Required'),
    // raw_weight: Yup.string().required('Raw Weight is Required'),
    // finish_weight: Yup.string().required('Finish Weight is Required'),
    // hsn_code: Yup.string().required('HSN Code  is Required'),
    // product_um: Yup.string().required('unit type is Required'),

})


const UnitOptions = [
    { label: 'kg', value: 'kg' },
    { label: 'mm', value: 'mm' },
    { label: 'nos', value: 'nos' },
]


const data = { pattern_id: '', category_id: '', material_grade_id: '', product_name: '', item_code: '', row_code: '', pump_model: '', product_um: '', hsn_code: '', product_description: '', standard_time: '', drawing_number: '', raw_weight: "", finish_weight: "" };



const filesData = {
    raw_drawing_attachment: null,
    finish_drawing_attachment: null,
    process_sheet_attachment: null,
}


const PersonalInformation = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [patternsOption, setPatternsOption] = useState([]);
    const [categoryOption, setCategoryOption] = useState([]);
    const [materialOption, setMaterialOption] = useState([]);

    const patterns = useSelector((state) => state.adminNewProductMaster.data.patternList);
    const categorys = useSelector((state) => state.adminNewProductMaster.data.categoryList);
    const materials = useSelector((state) => state.adminNewProductMaster.data.materialList);


    useEffect(() => {
        const patternsOption = patterns.map((customer) => ({

            value: customer.pattern_id,
            label: customer.pattern_number,
        }));
        // console.log(patternsOption)
        setPatternsOption(patternsOption);
    }, [patterns]);

    useEffect(() => {
        dispatch(getPatterns());
    }, [dispatch]);

    useEffect(() => {
        const categoryOption = categorys.map((category) => ({

            value: category.category_id,
            label: category.category_name,
        }));
        // console.log(categoryOption)
        setCategoryOption(categoryOption);
    }, [categorys]);

    useEffect(() => {
        dispatch(getCategorys());
    }, [dispatch]);


    useEffect(() => {
        const materialOption = materials.map((materialGrade) => ({

            value: materialGrade.material_grade_id,
            label: materialGrade.material_grade_number,
        }));
        // console.log(materialOption)
        setMaterialOption(materialOption);
    }, [materials]);

    useEffect(() => {
        dispatch(getmaterialGrades());
    }, [dispatch]);


    return (
        <>
            <Formik
                initialValues={{ ...data, ...filesData }}
                enableReinitialize={true}
                // validationSchema={validationSchema}

                onSubmit={async (values, { setSubmitting }) => {
                    const { raw_drawing_attachment, finish_drawing_attachment, process_sheet_attachment, ...mainData } = values;

                    mainData.pattern_id = Number(mainData.pattern_id);
                    mainData.category_id = Number(mainData.category_id);
                    mainData.material_grade_id = Number(mainData.material_grade_id);
                    mainData.raw_weight = Number(mainData.raw_weight);
                    mainData.finish_weight = Number(mainData.finish_weight);

                    console.log(values.raw_drawing_attachment)
                    console.log(values.finish_drawing_attachment)
                    console.log(values.process_sheet_attachment)

                    const formData = new FormData()
                    formData.append("file", values.raw_drawing_attachment)
                    formData.append("file", values.finish_drawing_attachment)
                    formData.append("file", values.process_sheet_attachment)

                    setSubmitting(true);

                    try {
                        const responseMainData = await dispatch(getAdminCreateProductMaster(mainData));

                        if (responseMainData?.payload?.status < 400) {

                            const responseFileUpload = await dispatch(uploadImage(formData));

                            if (responseFileUpload?.payload?.status < 400) {
                                const notificationWithAvatar = (
                                    <Notification title={mainData.product_name}>
                                        {responseMainData?.payload?.data?.message}
                                    </Notification>
                                );
                                Toast.push(notificationWithAvatar);
                            } else {
                                const notificationWithAvatar = (
                                    <Notification title={mainData.product_name} type="danger">
                                        {responseFileUpload?.payload?.data?.message || "File upload failed!"}
                                    </Notification>
                                );
                                Toast.push(notificationWithAvatar);
                            }
                        } else {
                            const notificationWithAvatar = (
                                <Notification title={mainData.product_name} type="danger">
                                    {responseMainData?.payload?.data?.message || "product submission failed!"}
                                </Notification>
                            );
                            Toast.push(notificationWithAvatar);
                        }
                    } catch (error) {
                        console.error("Error:", error);
                    } finally {
                        setSubmitting(false);
                    }
                }}
            >

                {({ values, touched, errors, isSubmitting, setFieldValue, handleChange }) => {
                    const validatedProps = { touched, errors }
                    return (
                        <Form encType="multipart/form-data">
                            <FormContainer>
                                <div className="mb-8">
                                    <h3 className="mb-2">Add Product Information</h3>
                                    <p>Basic information  </p>
                                </div>
                                <div className="md:grid grid-cols-3 gap-4">

                                    <FormItem
                                        label="Product Name"
                                        invalid={errors.product_name && touched.product_name}
                                        errorMessage={errors.product_name}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="product_name"
                                            placeholder="Product name"
                                            component={Input}
                                        />
                                    </FormItem>

                                    <FormItem
                                        label="Item Code"
                                        invalid={errors.item_code && touched.item_code}
                                        errorMessage={errors.item_code}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="item_code"
                                            placeholder="Item Code"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Raw Code"
                                        invalid={errors.row_code && touched.row_code}
                                        errorMessage={errors.row_code}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="row_code"
                                            placeholder="Raw Code"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Pump Model"
                                        invalid={errors.pump_model && touched.pump_model}
                                        errorMessage={errors.pump_model}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="pump_model"
                                            placeholder="Pump Model"
                                            component={Input}
                                        />
                                    </FormItem>

                                    <FormItem
                                        label=" product description"
                                        invalid={errors.product_description && touched.product_description}
                                        errorMessage={errors.product_description}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="product_description"
                                            placeholder="Product Code"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Drawing Number"
                                        invalid={errors.drawing_number && touched.drawing_number}
                                        errorMessage={errors.drawing_number}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="drawing_number"
                                            placeholder="Drawing Number"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="pattern number"
                                        invalid={errors.pattern_id && touched.pattern_id}
                                        errorMessage={errors.pattern_id}
                                    >

                                        {patternsOption && (
                                            <Select
                                                type="text"
                                                name="pattern_id"
                                                options={patternsOption}
                                                value={values.pattern_id}
                                                onChange={(selectedOption) => {
                                                    handleChange({
                                                        target: {
                                                            name: 'pattern_id',
                                                            value: selectedOption.pattern_id,
                                                        },
                                                    });


                                                    console.log(selectedOption);
                                                }}

                                            />

                                        )}
                                    </FormItem>
                                    <FormItem
                                        label="material_grade_id"
                                        invalid={errors.material_grade_id && touched.material_grade_id}
                                        errorMessage={errors.material_grade_id}
                                    >

                                        {materialOption && (
                                            <Select
                                                type="text"
                                                name="material_grade_id"
                                                options={materialOption}
                                                value={values.material_grade_id}
                                                onChange={(selectedOption) => {
                                                    handleChange({
                                                        target: {
                                                            name: 'material_grade_id',
                                                            value: selectedOption.material_grade_id,
                                                        },
                                                    });
                                                }}

                                            />

                                        )}
                                    </FormItem>
                                    <FormItem
                                        label="category name"
                                        invalid={errors.category_id && touched.category_id}
                                        errorMessage={errors.category_id}
                                    >

                                        {categoryOption && (
                                            <Select
                                                type="text"
                                                name="category_id"
                                                options={categoryOption}
                                                value={values.category_id}
                                                onChange={(selectedOption) => {
                                                    handleChange({
                                                        target: {
                                                            name: 'category_id',
                                                            value: selectedOption.category_id,
                                                        },
                                                    });
                                                }}

                                            />

                                        )}
                                    </FormItem>


                                    <FormItem
                                        label="Unit"
                                        invalid={
                                            errors.product_um &&
                                            touched.product_um
                                        }
                                        errorMessage={errors.product_um}
                                    >
                                        <Field name="product_um">
                                            {({ field, form }) => (
                                                <Select
                                                    placeholder="Unit"
                                                    field={field}
                                                    form={form}
                                                    options={UnitOptions}
                                                    // value={UnitOptions.filter(
                                                    //     (status) =>
                                                    //         status.value === values.product_um

                                                    // )}
                                                    value={values.product_um}
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
                                        label="Standard Lead Time (in Weeks)"
                                        invalid={errors.standard_time && touched.standard_time}
                                        errorMessage={errors.standard_time}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="standard_time"
                                            placeholder="Standard Lead Time"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Raw Weight"
                                        invalid={errors.raw_weight && touched.raw_weight}
                                        errorMessage={errors.raw_weight}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="raw_weight"
                                            placeholder="Raw Weight"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Finish Weight"
                                        invalid={errors.finish_weight && touched.finish_weight}
                                        errorMessage={errors.finish_weight}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="finish_weight"
                                            placeholder="Finish Weight"
                                            component={Input}
                                        />
                                    </FormItem>

                                    <FormItem
                                        label="HSN Code"
                                        invalid={errors.hsn_code && touched.hsn_code}
                                        errorMessage={errors.hsn_code}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="hsn_code"
                                            placeholder="HSN Code"
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>


                                <div className="mb-8 mt-6">
                                    <h3 className="mb-2">Attach Files</h3>
                                    <p></p>
                                </div>


                                <div className='md:grid grid-cols-3 gap-4'>


                                    <DocumentUploadField
                                        name="process_sheet_attachment"
                                        label="Process Sheet"
                                        {...validatedProps}
                                    />
                                    <DocumentUploadField
                                        name="finish_drawing_attachment"
                                        label="finish drawing"
                                        {...validatedProps}
                                    /><DocumentUploadField
                                        name="raw_drawing_attachment"
                                        label="raw drawing"
                                        {...validatedProps}
                                    />



                                </div>
                                <div className="flex justify-end gap-2">
                                    <Button
                                        loading={isSubmitting}
                                        variant="solid"
                                        type="submit"
                                    >
                                        {isSubmitting
                                            ? 'Please wait'
                                            : 'Save'}
                                    </Button>
                                </div>
                            </FormContainer>
                        </Form>
                    )
                }}
            </Formik >
        </>
    )
}

export default PersonalInformation
