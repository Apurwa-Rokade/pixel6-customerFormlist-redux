import {  useState } from 'react';
import { useDispatch } from 'react-redux';
import { verifyPAN, getPostcodeDetails } from '../api/api';
import { addCustomer } from '../app/customersSlice';
import { Customer } from '../types';
import { useNavigate } from 'react-router-dom';


export const useCustomerForm = () => {
  const dispatch = useDispatch();
  const [loadingPan, setLoadingPan] = useState(false);
  const [loadingPost, setLoadingPanPost] = useState(false);
  const [city, setCities] = useState<string[]>([]);
  const [state, setStates] = useState<string[]>([]);
  const navigate =useNavigate();


  const handleSubmit = (values: Customer) => {
    console.log("values",values)
    dispatch(addCustomer(values));
    navigate('/')

    
  };

  const handlePANChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void
  ) => {
    const panNumber = e.target.value;
    if (panNumber.length === 10) {
      setLoadingPan(true);
      const response = await verifyPAN(panNumber);
      setLoadingPan(false);

      if (response.isValid) {
        setFieldValue('fullName', response.fullName);
      }
    }
    setFieldValue('pan', panNumber); // Ensure PAN value is updated
  };

  const handlePostcodeChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    setFieldValue: (field: string, value: any) => void
  ) => {
    console.log(e.target.value)
    const postcode = e.target.value;
    if (postcode.length === 6) {
      setLoadingPanPost(true);
      const response = await getPostcodeDetails(postcode);
   
      setLoadingPanPost(false);

      if (response.status === 'Success') {
        console.log(response,"postchnage")
          const city = response.city[0]?.name;
        const state = response.state[0]?.name;
        setFieldValue(`addresses[${index}].city`, response.city[0]?.name || '');
        setFieldValue(`addresses[${index}].state`, response.state[0]?.name || '');
        setCities(city);
        setStates(state)
      }
    }
    setFieldValue(`addresses[${index}].postcode`, postcode); // Ensure postcode value is updated
  };
   const handleBlur = (e: React.FocusEvent<HTMLInputElement>, setFieldValue: (field: string, value: any) => void) => {
    const { name, value } = e.target;
    setFieldValue(name, value);
  };
  

  return {
    loadingPost,
    loadingPan,
    handleSubmit,
    handlePANChange,
    handlePostcodeChange,
    handleBlur,
    city,
    state,
  };
};
