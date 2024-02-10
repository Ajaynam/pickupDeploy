import {
    Input,
    Button,
    FormItem,
    FormContainer,
    Select,
    Toast,
    Notification,
} from '../../../components/ui'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import {  PasswordInput } from '../../../components/shared'
import { useDispatch, useSelector } from 'react-redux'
import { addShop, getBlock, getDistrict, getShopOwner, getState, getVillage } from '../store/dataSlice'
import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { HiPlusCircle } from 'react-icons/hi'
import FormData from 'form-data'

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name Required'),
    ownerId: Yup.string().required('Please select shop owner'),
    email: Yup.string().email('Invalid email'),
    mobile: Yup.string().required('Please enter your phone number'),
    stateId: Yup.string().required('Please enter your state'),
    blockId: Yup.string().required('Please enter your block'),
    districtId: Yup.string().required('Please enter your district'),
    villageId: Yup.string().required('Please enter your village'),
    password: Yup.string().required('Please enter your password'),
    // image: Yup.string().required('Please upload shop image'),
    cpassword: Yup.string().oneOf(
        [Yup.ref('password'), null],
        'Your passwords do not match'
    ).required('Password is required'),
})

const data = {
    stateId: '',
    name: '',
    districtId: '',
    email: '',
    blockId: '',
    cpassword: '',
    role: 'shop',
    password: '',
    ownerId: '',
    mobile: '',
    villageId: '',
    image: ''
}

const ShopInformation = () => {

    const dispatch = useDispatch()
    const fetchState = () => {
        dispatch(getState())
    }
    const fetchOwner = () => {
        dispatch(getShopOwner())
    }
    const fetchDistrict = (value) => {
        dispatch(getDistrict(value))
    }

    const fetchBlock = (value) => {
        dispatch(getBlock(value))
    }

    const fetchVillage = (value) => {
        dispatch(getVillage(value))
    }

    useEffect(() => {
        fetchState()
        fetchOwner()
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [stateId, setStateId] = useState(null)
    const [districtId, setDistrictId] = useState(null)
    const [blockId, setBlockId] = useState(null)

    useEffect(() => {
        if (stateId)
            fetchDistrict({ stateId })
        data.stateId = ''
        data.districtId = ''
        data.blockId = ''
        data.villageId = ''
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stateId])


    useEffect(() => {
        if (districtId)
            fetchBlock({ districtId })
        data.districtId = ''
        data.blockId = ''
        data.villageId = ''
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [districtId])


    useEffect(() => {
        if (blockId)
            fetchVillage({ blockId })
        data.blockId = ''
        data.villageId = ''
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [blockId])


    const state = useSelector(state => state.adminAddShop.data.state)
    const district = useSelector(state => state.adminAddShop.data.district)
    const block = useSelector(state => state.adminAddShop.data.block)
    const village = useSelector(state => state.adminAddShop.data.village)
    const owner = useSelector(state => state.adminAddShop.data.owner)

    const states = useMemo(() => {
        const data = state.map((items) => {
            return { label: items.name, value: items.id }
        })
        return data
    }, [state])

    const owners = useMemo(() => {
        const data = owner.map((items) => {
            return { label: items.name, value: items.id }
        })
        return data
    }, [owner])


    const districts = useMemo(() => {
        const data = district.map((items) => {
            return { label: items.name, value: items.id }
        })
        return data
    }, [district])


    const blocks = useMemo(() => {
        const data = block.map((items) => {
            return { label: items.name, value: items.id }
        })
        return data
    }, [block])


    const villages = useMemo(() => {
        const data = village.map((items) => {
            return { label: items.name, value: items.id }
        })
        return data
    }, [village])

    const navigate = useNavigate()
    return (
        <>
            <Formik
                initialValues={data}
                enableReinitialize={true}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(true)
                    const form = new FormData()
                    form.append('file', values.image)
                    // let image = await dispatch(uploadImage(form))
                    let action = await dispatch(addShop({ ...values }))
                    let notificationWithAvatar
                    if (action?.payload?.status < 400) {
                        notificationWithAvatar = (
                            <Notification
                                title={values?.name}
                                // customIcon={
                                //     <Avatar shape="circle" src={appConfig.apiPrefix + image?.payload?.data?.filename} />
                                // }
                            >
                                {action?.payload?.data?.message}
                            </Notification>
                        )
                        navigate('/shop/list')
                    } else {
                        notificationWithAvatar = (
                            <Notification
                                title={values?.email}
                                type='danger'
                            >
                                {action?.payload?.data?.message}
                            </Notification>
                        )
                    }
                    Toast.push(notificationWithAvatar)
                    setSubmitting(false)
                }}
            >
                {({ values, touched, errors, isSubmitting }) => {
                    return (
                        <Form>
                            <FormContainer>
                                <div className='flex justify-between align-middle h-full'>
                                    <div className="mb-8">
                                        <h3 className="mb-2">Shop Information</h3>
                                        <p>Basic information for a shop opening</p>
                                    </div>
                                    <div className="mb-4 flex">
                                        <Link
                                            className="block lg:inline-block md:mb-0 mb-4"
                                            to="/owner/new"
                                        >
                                            <Button block variant="solid" size="sm" icon={<HiPlusCircle />}>
                                                Add Owner
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                                <div className="md:grid grid-cols-2 gap-4">
                                    <FormItem
                                        label="Shop Owner"
                                        invalid={
                                            errors.ownerId && touched.ownerId
                                        }
                                        errorMessage={errors.ownerId}
                                    >
                                        <Field name="ownerId">
                                            {({ field, form }) => (
                                                <Select
                                                    placeholder="Shop Owner"
                                                    field={field}
                                                    form={form}
                                                    options={owners}
                                                    value={owners.filter(
                                                        (status) =>
                                                            status.value ===
                                                            values.ownerId
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
                                        label="Shop name"
                                        invalid={errors.name && touched.name}
                                        errorMessage={errors.name}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="name"
                                            placeholder="Shop name"
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>
                                <div className="md:grid grid-cols-2 gap-4">
                                    <FormItem
                                        label="Shop Email"
                                        invalid={errors.email && touched.email}
                                        errorMessage={errors.email}
                                    >
                                        <Field
                                            type="email"
                                            autoComplete="off"
                                            name="email"
                                            placeholder="Email"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Mobile"
                                        invalid={errors.mobile && touched.mobile}
                                        errorMessage={errors.mobile}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="mobile"
                                            placeholder="Shop Mobile"
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>
                                <div className="md:grid grid-cols-2 gap-4">
                                    <FormItem
                                        label="Shop Password"
                                        invalid={
                                            errors.password &&
                                            touched.password
                                        }
                                        errorMessage={errors.password}
                                    >
                                        <Field
                                            type="password"
                                            autoComplete="off"
                                            name="password"
                                            placeholder="Password"
                                            component={PasswordInput}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Confirm Password"
                                        invalid={errors.cpassword && touched.cpassword}
                                        errorMessage={errors.cpassword}
                                    >
                                        <Field
                                            type="password"
                                            autoComplete="off"
                                            name="cpassword"
                                            placeholder="Confirm password"
                                            component={PasswordInput}
                                        />
                                    </FormItem>
                                </div>
                                <div className="mb-8 mt-6">
                                    <h3 className="mb-2">Address Information</h3>
                                    <p>Your permanent address information for a shop opening</p>
                                </div>
                                <div className="md:grid grid-cols-2 gap-4">
                                    <FormItem
                                        label="State"
                                        invalid={
                                            errors.stateId && touched.stateId
                                        }
                                        errorMessage={errors.stateId}
                                    >
                                        <Field name="stateId">
                                            {({ field, form }) => (
                                                <Select
                                                    placeholder="Shop State"
                                                    field={field}
                                                    form={form}
                                                    options={states}
                                                    value={states.filter(
                                                        (status) =>
                                                            status.value ===
                                                            values.stateId
                                                    )}
                                                    onChange={(status) => {
                                                        form.setFieldValue(
                                                            field.name,
                                                            status.value
                                                        )
                                                        setStateId(status.value)
                                                    }
                                                    }
                                                />
                                            )}
                                        </Field>
                                    </FormItem>
                                    <FormItem
                                        label="District"
                                        invalid={
                                            errors.districtId && touched.districtId
                                        }
                                        errorMessage={errors.districtId}
                                    >
                                        <Field name="districtId">
                                            {({ field, form }) => (
                                                <Select
                                                    placeholder="Shop District"
                                                    field={field}
                                                    form={form}
                                                    options={districts}
                                                    value={districts.filter(
                                                        (status) =>
                                                            status.value ===
                                                            values.districtId
                                                    )}
                                                    onChange={(status) => {
                                                        form.setFieldValue(
                                                            field.name,
                                                            status.value
                                                        )
                                                        setDistrictId(status.value)
                                                    }
                                                    }
                                                />
                                            )}
                                        </Field>
                                    </FormItem>
                                </div>
                                <div className="md:grid grid-cols-2 gap-4">
                                    <FormItem
                                        label="Block"
                                        invalid={
                                            errors.blockId && touched.blockId
                                        }
                                        errorMessage={errors.blockId}
                                    >
                                        <Field name="blockId">
                                            {({ field, form }) => (
                                                <Select
                                                    placeholder="Shop block"
                                                    field={field}
                                                    form={form}
                                                    options={blocks}
                                                    value={blocks.filter(
                                                        (status) =>
                                                            status.value ===
                                                            values.blockId
                                                    )}
                                                    onChange={(status) => {
                                                        form.setFieldValue(
                                                            field.name,
                                                            status.value
                                                        )
                                                        setBlockId(status.value)
                                                    }}
                                                />
                                            )}
                                        </Field>
                                    </FormItem>
                                    <FormItem
                                        label="city / village / Town"
                                        invalid={
                                            errors.villageId && touched.villageId
                                        }
                                        errorMessage={errors.villageId}
                                    >
                                        <Field name="villageId">
                                            {({ field, form }) => (
                                                <Select
                                                    placeholder="Shop city / village / Town"
                                                    field={field}
                                                    form={form}
                                                    options={villages}
                                                    value={villages.filter(
                                                        (status) =>
                                                            status.value ===
                                                            values.villageId
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
                                {/* <DocumentUploadField
                                    name="image"
                                    label="Shop image"
                                    {...validatedProps}
                                >
                                    <DoubleSidedImage
                                        className="mx-auto mb-3"
                                        src="/img/thumbs/passport.png"
                                        darkModeSrc="/img/thumbs/passport-dark.png"
                                        alt=""
                                    />
                                </DocumentUploadField> */}
                                <div className="flex justify-end gap-2">
                                    <Button
                                        loading={isSubmitting}
                                        variant="solid"
                                        type="submit"
                                    >
                                        {isSubmitting
                                            ? 'Please wait'
                                            : 'Create'}
                                    </Button>
                                </div>
                            </FormContainer>
                        </Form>
                    )
                }}
            </Formik>
        </>
    )
}

export default ShopInformation
