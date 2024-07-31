import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Customer } from '../types';
import { v4 as uuidv4 } from "uuid" // Import uuid
import { customerValidationSchema } from '../validation/customerValidation';
import TextField from './TextField';
import { useCustomerForm } from '../hooks/useCustomerForm';
import { addCustomer, updateCustomer } from '../app/customersSlice';

const CustomerForm: React.FC = () => {
  const { id } = useParams<{ id?: string }>(); // Type for id from URL params
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loadingPan, loadingPost,  handlePANChange, handlePostcodeChange, state, city } = useCustomerForm();

  // Selector to fetch existing customer data from the store
  const existingCustomer = useSelector((state: { customers: Customer[] }) =>
    state.customers.find((customer) => customer.id === id)
  );

  console.log(id)
  // Initial values for the form
  const initialValues: Customer = existingCustomer || {
    id: '',
    pan: '',
    fullName: '',
    email: '',
    mobileNumber: '',
    addresses: [
      {
        addressLine1: '',
        addressLine2: '',
        postcode: '',
        city: '',
        state: ''
      }
    ],
  };

  // Effect to fetch existing customer details if editing
  useEffect(() => {
    if (id && !existingCustomer) {
      // Fetch customer details from API if needed
      // e.g., fetchCustomerById(id).then(data => dispatch(setCustomer(data)));
    }
  }, [id, existingCustomer, dispatch]);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6">{id ? 'Edit Customer' : 'Add Customer'}</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={customerValidationSchema}
        onSubmit={(values) => {
          if (id) {
            dispatch(updateCustomer(values));
          } else {
            const newCustomer = { ...values, id: uuidv4() };
            dispatch(addCustomer(newCustomer));
          }
          console.log(values)
          navigate('/');
        }}
      >
        {({ setFieldValue, values }) => (
          <Form className="space-y-6">
            <TextField
              name="pan"
              id="pan"
              label="PAN"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handlePANChange(e, setFieldValue)}
              value={values.pan}
              loading={loadingPan}
            />

            <TextField
              name="fullName"
              id="fullName"
              label="Full Name"
              type="text"
              value={values.fullName}
              readOnly
            />

            <TextField
              name="email"
              id="email"
              label="Email"
              type="email"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFieldValue('email', e.target.value)}
              value={values.email}
            />

            <TextField
              name="mobileNumber"
              id="mobileNumber"
              label="Mobile Number"
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFieldValue('mobileNumber', e.target.value)}
              value={values.mobileNumber}
            />

            {values.addresses.map((address, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-md">
                <h4 className="text-lg font-semibold mb-4">Address {index + 1}</h4>
                <TextField
                  name={`addresses[${index}].addressLine1`}
                  id={`addresses[${index}].addressLine1`}
                  label="Address Line 1"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFieldValue(`addresses[${index}].addressLine1`, e.target.value)}
                  value={address.addressLine1}
                />
                
                <TextField
                  name={`addresses[${index}].addressLine2`}
                  id={`addresses[${index}].addressLine2`}
                  label="Address Line 2"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFieldValue(`addresses[${index}].addressLine2`, e.target.value)}
                  value={address.addressLine2}
                />

                <TextField
                  name={`addresses[${index}].postcode`}
                  id={`addresses[${index}].postcode`}
                  label="Postcode"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handlePostcodeChange(e, index, setFieldValue)}
                  value={address.postcode}
                  loading={loadingPost}
                />

                <div>
                  <label htmlFor={`addresses[${index}].city`} className="block text-sm font-medium text-gray-700">City</label>
                  <Field
                    as="select"
                    id={`addresses[${index}].city`}
                    name={`addresses[${index}].city`}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    value={address.city}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFieldValue(`addresses[${index}].city`, e.target.value)}
                  >
                    <option value="">Select City</option>
                    {/* Options should be populated based on API response */}
                    <option>{city}</option>
                  </Field>
                  <ErrorMessage name={`addresses[${index}].city`} component="div" className="text-red-600 text-sm mt-1" />
                </div>

                <div>
                  <label htmlFor={`addresses[${index}].state`} className="block text-sm font-medium text-gray-700">State</label>
                  <Field
                    as="select"
                    id={`addresses[${index}].state`}
                    name={`addresses[${index}].state`}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    value={address.state}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFieldValue(`addresses[${index}].state`, e.target.value)}
                  >
                    <option value="">Select State</option>
                    {/* Options should be populated based on API response */}
                    <option>{state}</option>
                  </Field>
                  <ErrorMessage name={`addresses[${index}].state`} component="div" className="text-red-600 text-sm mt-1" />
                </div>
              </div>
            ))}

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              {id ? 'Update Customer' : 'Add Customer'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CustomerForm;
