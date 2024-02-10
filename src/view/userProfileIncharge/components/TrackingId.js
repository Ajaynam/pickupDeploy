

import {
    Input,
    Button,
    FormItem,
    FormContainer,
    Notification,
    Toast,
} from '../../../components/ui';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { AddTrackingId } from '../store/dataSlice';
import { useDispatch } from 'react-redux';

const validationSchema = Yup.object().shape({
    trackingNo: Yup.string().required(' Tracking-ID Required'),
});

const data = {
    trackingNo: '',
};

const TrackingId = (userId) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
       
        <Formik
            initialValues={data}
            enableReinitialize={true}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true);

                try {
                    // Extract orderId from your route or provide it appropriately
                    const orderId = userId ; // Replace with your orderId or get it dynamically

                    // Send the POST request to your Express.js server
                    const response = await fetch(`https://pickup-server-y10z.onrender.com//updateTrackingNo/${orderId}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ trackingNo: values.trackingNo }),
                    });

                    // Handle the response from the server
                    if (response.status < 400) {
                        const data = await response.json();
                        // Handle success, e.g., show a success message
                        console.log(data.message);
                        // navigate('/shop/list');
                    } else {
                        const errorData = await response.json();
                        // Handle error, e.g., show an error message
                        console.error(errorData.message);
                    }
                } catch (error) {
                    // Handle any unexpected errors
                    console.error('Unexpected error:', error.message);
                }

                setSubmitting(false);
            }}
        >

            {({ values, touched, errors, isSubmitting }) => (
                <Form>
                    <FormContainer>
                        <div className="md:grid grid-cols-3 gap-4">

                            <FormItem
                                label="tracking No"
                                invalid={errors.trackingNo && touched.trackingNo}
                                errorMessage={errors.trackingNo}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="trackingNo"
                                    placeholder="tracking No"
                                    component={Input}
                                />
                            </FormItem>


                        </div>

                        <div className="flex justify-end gap-2">
                            <Button
                                loading={isSubmitting}
                                variant="solid"
                                type="submit"
                            >
                                {isSubmitting ? 'Please wait' : 'Save'}
                            </Button>
                        </div>
                    </FormContainer>
                </Form>
            )}
        </Formik>
    );
};

export default TrackingId;

