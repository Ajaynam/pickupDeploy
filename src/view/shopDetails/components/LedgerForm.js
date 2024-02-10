import {
    Input,
    Button,
    FormItem,
    FormContainer,
    Toast,
    Notification,
} from '../../../components/ui'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { getAllLedgerListByShopId, getOrdersByShopId, postPayLedgerAmountByShopId } from '../store/dataSlice'
import { useDispatch } from 'react-redux'
import { NumericFormat } from 'react-number-format'
import useQuery from '../../../utils/hooks/useQuery'

const validationSchema = Yup.object().shape({
    amount: Yup.number().required('Amount Required'),
})

const data = {
    amount: ''
}

const LedgerForm = () => {
    const searchQuery = useQuery()
    const shopId = searchQuery.get('id')

    const dispatch = useDispatch()
    return (
        <>
            <Formik
                initialValues={data}
                enableReinitialize={true}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                    setSubmitting(true)
                    const value = { shopId, ...values }
                    let action = await dispatch(postPayLedgerAmountByShopId(value))
                    let notificationWithAvatar
                    if (action?.payload?.status < 300) {
                        notificationWithAvatar = (
                            <Notification
                                title='Payment status'
                                type='success'
                            >
                                {action?.payload?.data?.message}
                            </Notification>
                        )
                        resetForm(values.amount = '')
                        dispatch(getAllLedgerListByShopId({ shopId }))
                        dispatch(getOrdersByShopId({ shopId }))
                    } else {
                        notificationWithAvatar = (
                            <Notification
                                title='Payment status'
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
                                <div className="md:grid grid-cols-3 gap-3">
                                    <div className="col-span-2">
                                        <FormItem
                                            label="Amount"
                                            invalid={errors.amount && touched.amount}
                                            errorMessage={errors.amount}
                                        >
                                            <Field
                                                type="number"
                                                autoComplete="off"
                                                size='sm'
                                                name="amount"
                                                placeholder="Amount"
                                                component={Input}
                                            />
                                        </FormItem>
                                    </div>
                                    <div className="col-span-1">
                                        <FormItem
                                            className='mt-6'
                                        >
                                            <Button
                                                loading={isSubmitting}
                                                variant="solid"
                                                type="submit"
                                                size='sm'
                                                className="mt-1"
                                            >
                                                {isSubmitting
                                                    ? 'Please wait'
                                                    : 'Debit now'}
                                            </Button>
                                        </FormItem>
                                    </div>
                                </div>
                            </FormContainer>
                        </Form>
                    )
                }}
            </Formik>
        </>
    )
}

export default LedgerForm
