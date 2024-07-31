import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';  // Update the path as necessary
import { deleteCustomer } from '../app/customersSlice';  // Update the path as necessary
import { Link } from 'react-router-dom';

const CustomerList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const customers = useSelector((state: RootState) => state.customers);

  const handleDelete = (id: string) => {
    dispatch(deleteCustomer(id));
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Customer List</h2>
      <Link to="/add-customer" className="mb-4 inline-block bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600">
        Add New Customer
      </Link>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{customer.fullName}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <Link to={`/edit-customer/${customer.id}`} className="text-blue-600 hover:text-blue-900 mr-4">
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(customer.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;
