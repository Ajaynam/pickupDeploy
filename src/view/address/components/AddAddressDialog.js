import React from 'react';
import { Button, Dialog, FormContainer, FormItem, Input, Notification, Toast } from '../../../components/ui';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup'; // Import Yup for form validation
import { addBlock, addDistrict, addVillage, getAllBlockByDistrictId, getAllDistrictByStateId, getAllVillageByBlockId } from '../store/dataSlice';
import { useDispatch, useSelector } from 'react-redux';

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
});

const AddAddressDialog = ({ dialogIsOpen, onDialogClose, item }) => {
    const dispatch = useDispatch();
    const { stateId, districtId, blockId } = useSelector((state) => state.address.state);

    const handleAddition = async (data) => {
        const itemMap = {
          state: { itemId: stateId, action: addDistrict, additionalAction: getAllDistrictByStateId },
          district: { itemId: districtId, action: addBlock, additionalAction: getAllBlockByDistrictId },
          block: { itemId: blockId, action: addVillage, additionalAction: getAllVillageByBlockId },
        };
      
        const { itemId, action, additionalAction } = itemMap[item];
        const { status, data: responseData } = (await dispatch(action({ ...data, [`${item}Id`]: itemId })))?.payload || {};
      
        Toast.push(
          <Notification title={status < 400 ? 'Successfully added' : 'Error'} type={status < 400 ? 'success' : 'danger'}>
            {responseData?.message}
          </Notification>
        );
      
        if (status < 400 && additionalAction) {
          dispatch(additionalAction({ [`${item}Id`]: itemId }));
        }
      };
      
      
      const getName = () => {
        const itemToNameMap = {
          state: 'District',
          district: 'Block',
          block: 'Village',
        };
      
        return itemToNameMap[item] || '';
      };
      
      const name = getName();
      

    return (
        <div>
            <Dialog isOpen={dialogIsOpen} onClose={onDialogClose} onRequestClose={onDialogClose}>
                <h5 className="mb-4">No {name} present, please add one</h5>
                <Formik
                    initialValues={{
                        name: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                        setSubmitting(true);
                        await handleAddition(values);
                        onDialogClose()
                        setSubmitting(false);
                    }}
                >
                    {({ touched, errors, isSubmitting, values }) => (
                        <Form>
                            <FormContainer>
                                <FormItem>
                                    <Field
                                        style={{ marginBottom: 0 }}
                                        type="text"
                                        autoComplete="off"
                                        name="name"
                                        placeholder="name"
                                        component={Input}
                                    />
                                    {errors.name && touched.name && <div className="error">{errors.name}</div>}
                                </FormItem>
                                <Button block type="submit" classNames="mt-0">
                                    {isSubmitting ? 'please wait...' : 'Create'}
                                </Button>
                            </FormContainer>
                        </Form>
                    )}
                </Formik>
            </Dialog>
        </div>
    );
};

export default AddAddressDialog;
