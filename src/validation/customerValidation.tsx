import * as Yup from 'yup';

export const customerValidationSchema = Yup.object().shape({
  pan: Yup.string()
    .required('PAN is required')
    .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'PAN is not valid'),
  fullName: Yup.string().required('Full Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  mobileNumber: Yup.string()
    .required('Mobile Number is required')
    .matches(/^[0-9]{10}$/, 'Mobile Number is not valid'),
  addresses: Yup.array().of(
    Yup.object().shape({
      addressLine1: Yup.string().required('Address Line 1 is required'),
      postcode: Yup.string()
        .required('Postcode is required')
        .matches(/^[0-9]{6}$/, 'Postcode is not valid'),
      city: Yup.string().required('City is required'),
      state: Yup.string().required('State is required'),
    })
  ),
});
