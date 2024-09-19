// src/Components/SecurityInputDropdown.js

import React, { useState, useCallback, useEffect } from 'react';
import { Dropdown, Button, Form, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/actions/userActions';
import "../css/inputDropdown.css";

const SecurityInputDropdown = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State for selected security type and input value
  const [type, setType] = useState("");
  const [inputValue, setInputValue] = useState("");

  // Get authentication status and error from Redux store
  const { isAuthenticated, error } = useSelector((state) => state.user || {});

  // Handle security type selection
  const handleTypeSelect = useCallback((selectedType) => {
    setType(selectedType);
    setInputValue("");
  }, []);

  // Handle input value change
  const handleInputChange = useCallback((e) => {
    const { value } = e.target;
    setInputValue(value.trim());
  }, []);

  // Handle form submission
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (inputValue) {
      // Dispatch login action based on security type
      dispatch(loginUser({ [type.toLowerCase()]: inputValue }));
    } else {
      // Handle error if no input value
      console.error(`Please provide your ${type}.`);
    }
  }, [dispatch, type, inputValue]);

  // Get placeholder text based on selected security type
  const getPlaceholder = () => {
    switch (type) {
      case "PIN":
        return "Enter your PIN";
      case "Password":
        return "Enter your password";
      default:
        return "Enter your security info";
    }
  };

  // Redirect to account dashboard if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/account-dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="login-dropdown d-flex flex-column justify-content-center align-items-center">
      <div className="dropdownGrid">
        {/* Security type dropdown */}
        <Dropdown onSelect={handleTypeSelect}>
          <Dropdown.Toggle aria-label="Select Security Type">
            {type || "Select Security Type"}
          </Dropdown.Toggle>
          <Dropdown.Menu className="bg-success btndrpdwn" role="menu">
            <Dropdown.Item eventKey="PIN" aria-label="PIN">PIN</Dropdown.Item>
            <Dropdown.Item eventKey="Password" aria-label="Password">Password</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        {/* Security input form */}
        <Form onSubmit={handleSubmit} className="formInputGrid">
          <Form.Control
            type={type === "PIN" ? "number" : "password"}
            placeholder={getPlaceholder()}
            value={inputValue}
            onChange={handleInputChange}
            aria-label={`${type || "Security"} Input`}
            className="formInputGrid"
          />
          <Button type="submit" variant="success" className="button mt-3">
            Submit
          </Button>
        </Form>

        {/* Back to Accounts link */}
        <div className="back-link-container">
          <Link to="/account" className="linktag">
            <h3 className="back">Go Back To Accounts</h3>
          </Link>
        </div>
      </div>
      
      {/* Display error if present */}
      {error && <Alert variant="danger" role="alert">{error}</Alert>}
    </div>
  );
};

export default SecurityInputDropdown;