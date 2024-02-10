

import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    unitName: Yup.string().required('Unit Name is required'),
});

const CreateUnitsDialog = ({ isOpen, onRequestClose }) => {
    return (
        <Formik
            initialValues={{ unitName: '' }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
                // Handle form submission or dispatch an action to create units
                // Close the dialog when done
                onRequestClose();
                resetForm();
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    <h2>Create Pattern</h2>
                    <div>
                        <label htmlFor="unitName">Unit Name:</label>
                        <Field type="text" id="unitName" name="unitName" />
                        <ErrorMessage name="unitName" component="div" className="error" />
                    </div>

                    <button type="submit" disabled={isSubmitting}>Create</button>
                </Form>
            )}
        </Formik>
    );
};

export default CreateUnitsDialog;
