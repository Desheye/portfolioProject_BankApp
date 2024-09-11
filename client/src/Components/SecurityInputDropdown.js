import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Dropdown, Form, Alert } from 'react-bootstrap';
import '../css/inputDropdown.css';

const SecurityInputDropdown = () => {
  const [selectedType, setSelectedType] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleTypeSelect = (type) => setSelectedType(type);
  const handleInputChange = (e) => setInputValue(e.target.value);

  const handleSubmit = async () => {
    try {
      const payload = { type: selectedType.toLowerCase(), value: inputValue };
      const response = await axios.post('/get-user-data', payload);
      // Example usage of response data
      console.log('Server response:', response.data);

      localStorage.setItem('userSecurity', JSON.stringify(payload));
      navigate('/account-dashboard');
    } catch (error) {
      setErrorMessage(error.response?.data?.error || 'Authentication failed.');
    }
  };

  return (
    <div className="login-dropdown">
      {!selectedType ? (
        <Dropdown onSelect={handleTypeSelect}>
          <Dropdown.Toggle>Select Security Type</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="PIN">PIN</Dropdown.Item>
            <Dropdown.Item eventKey="Password">Password</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <div className="inputGroup">
          <Form.Control
            type={selectedType === 'PIN' ? 'number' : 'password'}
            placeholder={`Enter ${selectedType}`}
            value={inputValue}
            onChange={handleInputChange}
          />
          <Button onClick={handleSubmit} variant="success" className="mt-2">
            Submit
          </Button>
        </div>
      )}
      {errorMessage && <Alert variant="danger" className="mt-3">{errorMessage}</Alert>}
    </div>
  );
};

export default SecurityInputDropdown;
