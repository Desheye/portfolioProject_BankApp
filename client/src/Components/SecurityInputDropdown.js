// components/SecurityInputDropdown.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, Button, Form, Alert } from 'react-bootstrap';
import { setSecurityType, fetchUserData } from '../actions/userActions';
import { useNavigate } from 'react-router-dom';
import '../../src/css/inputDropdown.css';


const SecurityInputDropdown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, type } = useSelector(state => state.user);
  const [inputValue, setInputValue] = useState('');

  // Handle selection of security type
  const handleTypeSelect = (type) => {
    dispatch(setSecurityType(type, inputValue));
  };

  // Handle input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Handle form submission
  const handleSubmit = () => {
    if (type) {
      dispatch(fetchUserData(type, inputValue));
      navigate('/account-dashboard');
    }
  };

  return (
    <div className="login-dropdown">
      <Dropdown onSelect={handleTypeSelect}>
        <Dropdown.Toggle>Select Security Type</Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item eventKey="PIN">PIN</Dropdown.Item>
          <Dropdown.Item eventKey="Password">Password</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      
      <Form.Control
        type="text"
        placeholder="Enter your security info"
        value={inputValue}
        onChange={handleInputChange}
      />
      <Button onClick={handleSubmit} variant="success" className="mt-2">
        Submit
      </Button>

      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
    </div>
  );
};

export default SecurityInputDropdown;