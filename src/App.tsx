import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';  // Update the path as necessary
import CustomerForm from './components/CustomerForm';  // Update the path as necessary
import CustomerList from './components/CustomerList';  // Update the path as necessary

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<CustomerList />} />
            <Route path="/add-customer" element={<CustomerForm />} />
            <Route path="/edit-customer/:id" element={<CustomerForm />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
