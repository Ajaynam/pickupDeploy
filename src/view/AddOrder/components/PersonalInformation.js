import { Field, Form, Formik } from "formik";
import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import * as Yup from "yup";
import {
  Input,
  Button,
  FormItem,
  FormContainer,
  Notification,
  Toast,
} from "../../../components/ui";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Info.css";

const options = ["Document", "Parcel", "Cargo"]; // Options array
const validationSchema = Yup.object().shape({
  pname: Yup.string().required("Supplier name Required"),
  // pnumber: Yup.array().of(Yup.string().required("Mobile Required")),
  product_description: Yup.array().of(
    Yup.string().required("Product Dscription required")
  ),
  // paddress: Yup.array().of(Yup.string().required("Address Required")),
  // supplier_contact_person: Yup.array().of(
  //   Yup.object().shape({
  //     person: Yup.string().required('Contact Person Required'),
  //     mobile: Yup.string().required('Mobile Required'),
  //   })
  // ),
  pcity: Yup.string().required("City is Required"),
  ppin: Yup.string().required("Pin Code is Required"),
  // supplier_state: Yup.string().required("State is Required"),
  // supplier_email: Yup.array().of(Yup.string().email("Invalid email")),

  dname: Yup.string().required("Drop name Required"),
  // dnumber: Yup.array().of(Yup.string().required("Mobile Required")),
  dcity: Yup.string().required("City is Required"),
  dpin: Yup.string().required("Pin Code is Required"),
  dstate: Yup.string().required("State is Required"),
  // deliver_email: Yup.array().of(Yup.string().email("Invalid email")),
  // supplier_pan: Yup.string().required('PAN Number is Required'),
  // supplier_gstin: Yup.string().required('GSTIN is Required'),
});

const PersonalInformation = () => {
  const [showSpinner, setShowSpinner] = useState(false); // New state for spinner
  const location = useLocation();
  const [formData, setFormData] = useState({
    pname: "",
    pnumber: "",
    pemail: "",
    paddress: "",
    ppin: "",
    pcity: "",
    pstate: "",
    dname: "",
    dnumber: "",
    demail: "",
    daddress: "",
    dpin: "",
    dcity: "",
    dstate: "",
    packageType: "",
    weight: "",
    ChargableWeight: "",
    shiptype: "",
    price: "",
    orderDate: new Date().toISOString().slice(0, 10),
    trackingNo: "",
  });

  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [selectedOption, setSelectedOption] = useState(null);
  // const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [selectedOption, setSelectedOption] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const options = ["Document", "Parcel", "Cargo"]; // List of option

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        setShowSpinner(true);
        const response = await axios.post("https://pickup-server-y10z.onrender.com/order/postBooking", formData);
           setShowSpinner(false);
        window.alert("order create successfull")

        console.log(response.data);

        setFormData({
          pname: "",
          pnumber: "",
          pemail: "",
          paddress: "",
          ppin: "",
          pcity: "",
          pstate: "",
          dname: "",
          dnumber: "",
          demail: "",
          daddress: "",
          dpin: "",
          dcity: "",
          dstate: "",
          packageType: "",
          weight: "",
          ChargableWeight: "",
          shiptype: "",
          price: "",
          orderDate: new Date().toISOString().slice(0, 10),
          trackingNo: "",

        });
        setIsOpen(false);
        alert("Form submitted successfully! Order ID: " + response.data.orderId);
    } catch (error) {
        console.error("Error submitting form:", error);
    } finally {
        setShowSpinner(false);
    }
};

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const openDropdown = () => {
    setIsOpen(!isOpen);
  };
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setFormData({
      ...formData,
      packageType: option,
    });
    setIsOpen(false);
  };
  return (
    <Formik
      initialValues={formData}
      enableReinitialize={true}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        values.supplier_mobile = values.supplier_mobile.map(Number);
        values.supplier_pincode = Number(values.supplier_pincode);
        console.log('Form Data', values);
        values.supplier_contact_person = values.supplier_contact_person.map(
          (person) => ({
            ...person,
            mobile: Number(person.mobile),
          })
        );
        setSubmitting(true);
  
        let action = await dispatch({ ...values });
        let notificationWithAvatar;
              
        if (action?.payload?.status < 400) {
          notificationWithAvatar = (
            <Notification title={values?.supplier_name}>
              {action?.payload?.data?.message}
            </Notification>
          );
          console.log(action.payload.data.message);
          // navigate('/shop/list');
        } else {
          notificationWithAvatar = (
            <Notification title={values?.supplier_email} type="danger">
              {action?.payload?.data?.message}
            </Notification>
          );
        }
  
        Toast.push(notificationWithAvatar);
        setSubmitting(false);
      }}
    >
      {({ values, touched, errors, isSubmitting }) => (
        <Form onSubmit={handleSubmit}>
        <FormContainer>
            <div className="mb-8">
              <h3 className="mb-2">Add New Order </h3>
              <p>Basic information </p>
            </div>
            <div className="border rounded-md px-4 pt-2">
              <h5 className="mb-4">Parcel Details</h5>
              <div className="md:grid grid-cols-3 gap-x-4">
                <FormItem label="Weight ">
                  <Field
                    type="number"
                    autoComplete="off"
                    name="weight"
                    value={values.weight}
                    onChange={handleChange}
                    placeholder="Weight "
                    component={Input}
                    invalid={errors.product_weight && touched.product_weight}
                    errorMessage={errors.product_weight}
                  />
                </FormItem>
                <FormItem label="Product Description">
                  <Field
                    type="text"
                    autoComplete="off"
                    name="product_description"
                    placeholder="Product Description"
                    component={Input}
                    invalid={
                      errors.product_description && touched.product_description
                    }
                    errorMessage={errors.product_description}
                  />
                </FormItem>
                <FormItem label="Product Value">
                  <Field
                    type="text"
                    autoComplete="off"
                    name="product_value"
                    placeholder="Product Value"
                    component={Input}
                    invalid={errors.product_value && touched.product_value}
                    errorMessage={errors.product_value}
                  />
                </FormItem>
                <FormItem label="Number Of Parcel">
                  <Field
                    type="number"
                    autoComplete="off"
                    name="no_of_parcel"
                    placeholder="Number Of Parcel"
                    component={Input}
                    invalid={errors.no_of_parcel && touched.no_of_parcel}
                    errorMessage={errors.no_of_parcel}
                  />
                </FormItem>
                <FormItem label="Length (cm)">
                  <Field
                    type="number"
                    autoComplete="off"
                    name="product_length"
                    placeholder="Length (cm)"
                    component={Input}
                    invalid={errors.product_length && touched.product_length}
                    errorMessage={errors.product_length}
                  />
                </FormItem>
                <FormItem label="width">
                  <Field
                    type="text"
                    autoComplete="off"
                    name="supplier_state"
                    placeholder="width (cm)"
                    component={Input}
                    invalid={errors.supplier_state && touched.supplier_state}
                    errorMessage={errors.supplier_state}
                  />
                </FormItem>
                <FormItem label="Height (cm)">
                  <Field
                    type="number"
                    autoComplete="off"
                    name="product_height"
                    placeholder="Height (cm)"
                    component={Input}
                    invalid={errors.product_height && touched.product_height}
                    errorMessage={errors.product_height}
                  />
                </FormItem>
                <div className="dropdown" ref={dropdownRef}>
                  <FormItem label="Package Type">
                    <div className="dropdown-input">
                      <input
                        type="text"
                        value={selectedOption || ""}
                        placeholder="Package Type"
                        readOnly
                        onClick={openDropdown}
                        className="appearance-none border border-gray-300 rounded-md py-2 px-4 w-full"
                      />
                      <div
                        className="dropdown-icon cursor-pointer"
                        onClick={toggleDropdown}
                      >
                        <i className="fas fa-chevron-down"></i>
                      </div>
                    </div>
                  </FormItem>
                  {isOpen && (
                    <ul className="dropdown-menu absolute mt-0 w-full bg-white border border-gray-300 rounded-md shadow-md z-10">
                      {options.map((option, index) => (
                        <li
                          key={index}
                          className="py-1 px-3 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleOptionClick(option)}
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <FormItem label="Ship Type ">
                  <Field
                    type="text"
                    autoComplete="off"
                    name="price"
                    placeholder="Ex. Express , Air , Cargo"
                    component={Input}
                    // invalid={errors.product_height && touched.product_height}
                    // errorMessage={errors.product_height}
                  />
                </FormItem>
                <FormItem label="Amount">
                  <Field
                    type="number"
                    autoComplete="off"
                    name="price"
                    placeholder="Amount"
                    component={Input}
                    // invalid={errors.product_height && touched.product_height}
                    // errorMessage={errors.product_height}
                  />
                </FormItem>
              </div>
            </div>
            <div className="grid mt-4 grid-cols-2 gap-2">
              <div className=" border rounded-md px-4 pt-2">
                <h5 className="mb-4">Pickup Address </h5>
                <div className="md:grid grid-cols-2 gap-x-4  ">
                  <FormItem
                    label="Pickup Contact Name"
                    invalid={errors.pname && touched.pname}
                    errorMessage={errors.pname}
                  >
                    <Field
                      type="text"
                      autoComplete="off"
                      name="pname"
                      value={values.pname}
                      onChange={handleChange}
                      placeholder="Pickup Contact Name"
                      component={Input}
                    />
                  </FormItem>
                  <FormItem
                    label="Pickup Mobile"
                    invalid={errors.pnumber && touched.pnumber}
                    errorMessage={errors.pnumber}
                  >
                    <Field
                      type="number"
                      autoComplete="off"
                      name="pnumber"
                      value={values.pnumber}
                      onChange={handleChange}
                      placeholder="Pickup Mobile"
                      component={Input}
                    />
                  </FormItem>

                  <FormItem
                    label="Pickup Email"
                    invalid={errors.pemail && touched.pemail}
                    errorMessage={errors.pemail}
                  >
                    <Field
                      type="email"
                      autoComplete="off"
                      name="pemail"
                      value={values.pemail}
                      onChange={handleChange}
                      placeholder="Pickup Email"
                      component={Input}
                    />
                  </FormItem>

                  <FormItem
                    label="Pickup Address"
                    invalid={errors.paddress && touched.paddress}
                    errorMessage={errors.paddress}
                  >
                    <Field
                      type="text"
                      autoComplete="off"
                      name="paddress"
                      value={values.paddress}
                      onChange={handleChange}
                      placeholder="Pickup Address"
                      component={Input}
                    />
                  </FormItem>

                  <FormItem
                    label="Pickup Pincode"
                    invalid={errors.ppin && touched.ppin}
                    errorMessage={errors.ppin}
                  >
                    <Field
                      type="number"
                      autoComplete="off"
                      name="ppin"
                      value={values.ppin}
                      onChange={handleChange}
                      placeholder="Pickup Pincode"
                      component={Input}
                    />
                  </FormItem>

                  <FormItem
                    label="Pickup city"
                    invalid={errors.pcity && touched.pcity}
                    errorMessage={errors.pcity}
                  >
                    <Field
                      type="text"
                      autoComplete="off"
                      name="pcity"
                      value={values.pcity}
                      onChange={handleChange}
                      placeholder="Pickup city "
                      component={Input}
                    />
                  </FormItem>
                </div>
              </div>

              <div className=" border  rounded-md px-4 pt-2">
                <h5 className="mb-4">Drop Address </h5>
                <div className="md:grid grid-cols-2 gap-x-4  ">
                  <FormItem
                    label="Drop Contact Name"
                    invalid={errors.dname && touched.dname}
                    errorMessage={errors.dname}
                  >
                    <Field
                      type="text"
                      autoComplete="off"
                      name="dname"
                      value={values.dname}
                      onChange={handleChange}
                      placeholder="Drop Contact Name"
                      component={Input}
                    />
                  </FormItem>
                  <FormItem
                    label="Drop Mobile"
                    invalid={errors.dnumber && touched.dnumber}
                    errorMessage={errors.dnumber}
                  >
                    <Field
                      type="text"
                      autoComplete="off"
                      name="dnumber"
                      value={values.dnumber}
                      onChange={handleChange}
                      placeholder="Drop Mobile"
                      component={Input}
                    />
                  </FormItem>
                  <FormItem
                    label="Drop Email"
                    invalid={errors.demail && touched.demail}
                    errorMessage={errors.demail}
                  >
                    <Field
                      type="email"
                      autoComplete="off"
                      name="demail"
                      value={values.demail}
                      onChange={handleChange}
                      placeholder="Drop Email"
                      component={Input}
                    />
                  </FormItem>

                  <FormItem
                    label="Drop Address"
                    invalid={errors.paddress && touched.paddress}
                    errorMessage={errors.paddress}
                  >
                    <Field
                      type="text"
                      autoComplete="off"
                      name="daddress"
                      value={values.daddress}
                      onChange={handleChange}
                      placeholder="Drop Address"
                      component={Input}
                    />
                  </FormItem>

                  <FormItem
                    label="Drop Pincode"
                    invalid={errors.dpin && touched.dpin}
                    errorMessage={errors.dpin}
                  >
                    <Field
                      type="text"
                      autoComplete="off"
                      name="dpin"
                      value={values.dpin}
                      onChange={handleChange}
                      placeholder="Drop Pincode"
                      component={Input}
                    />
                  </FormItem>

                  <FormItem
                    label="Drop city"
                    invalid={errors.dcity && touched.dcity}
                    errorMessage={errors.dcity}
                  >
                    <Field
                      type="text"
                      autoComplete="off"
                      name="dcity"
                      value={values.dcity}
                      onChange={handleChange}
                      placeholder="Drop city "
                      component={Input}
                    />
                  </FormItem>
                </div>
              </div>
            </div>

            <div className="flex mt-2 justify-end gap-2">
              <Button loading={isSubmitting} variant="solid" type="submit">
                {isSubmitting ? "Please wait" : "Save"}
              </Button>
            </div>
          </FormContainer>
        </Form>
      )}
    </Formik>
  );
};

export default PersonalInformation;
