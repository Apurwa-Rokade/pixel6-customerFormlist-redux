// src/components/TextField.tsx

import React from 'react';
import { Field, ErrorMessage } from 'formik';

interface TextFieldProps {
  name: string;
  id: string;
  label: string;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  value?: string;
  loading?: boolean;
  readOnly?: boolean;
}

const TextField: React.FC<TextFieldProps> = ({ name, id, label, type = 'text', onChange,onBlur, value, loading ,readOnly}) => {
  return (
    <div className="flex items-center justify-center mb-4">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mr-2"
      >
        {label}
      </label>
      <Field
        name={name}
        id={id}
        type={type}
        className="mt-1 w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        readOnly={readOnly}
      />
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-600 text-sm mt-1"
      />
      {loading && (
       <div className="loader"></div>
      )}
    </div>
  );
};

export default TextField;
