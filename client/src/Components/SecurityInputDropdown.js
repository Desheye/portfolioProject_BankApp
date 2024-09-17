// src/Components/SecurityInputDropdown.js

import React, { useState, useCallback, useEffect } from 'react';
import { Dropdown, Button, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/actions/userActions';
import { Link } from 'react-router-dom';
import "../css/inputDropdown.css";

const SecurityInputDropdown = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [type, setType] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [password, setPassword] = useState("");

  // Use optional chaining to prevent errors if state.user is undefined
  const { isAuthenticated, error } = useSelector((state) => state.user || {});

  const handleTypeSelect = useCallback((selectedType) => {
    setType(selectedType);
    setInputValue("");
  }, []);

  const handleInputChange = useCallback((e) => {
    const { value } = e.target;
    setInputValue(value.trim());
  }, []);

  const handlePasswordChange = useCallback((e) => {
    const { value } = e.target;
    setPassword(value.trim());
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (type === "PIN" && inputValue) {
      // Dispatch login with PIN
      dispatch(loginUser({ pin: inputValue }));
    } else if (type === "Password" && password) {
      // Dispatch login with Password
      dispatch(loginUser({ password }));
    } else {
      // Handle error
      console.error("Please provide either PIN or Password.");
    }
  }, [dispatch, type, inputValue, password]);
  

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
        <Dropdown onSelect={handleTypeSelect}>
          <Dropdown.Toggle aria-label="Select Security Type">
            {type || "Select Security Type"}
          </Dropdown.Toggle>
          <Dropdown.Menu className="bg-success" role="menu">
            <Dropdown.Item eventKey="PIN" aria-label="PIN">PIN</Dropdown.Item>
            <Dropdown.Item eventKey="Password" aria-label="Password">Password</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Form onSubmit={handleSubmit} className="formInputGrid">
          <Form.Control
            type={type === "PIN" ? "number" : "password"}
            placeholder={getPlaceholder()}
            value={inputValue}
            onChange={handleInputChange}
            aria-label={`${type || "Security"} Input`}
            className="formInputGrid"
          />
          {type === "Password" && (
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
              aria-label="Password Input"
              className="formInputGrid mt-2"
            />
          )}
          <Button type="submit" variant="success" className="button mt-3">
            Submit
          </Button>

          <Link to='/account' className='linktag'>
            <h3 className='back'>Go Back To Accounts</h3>
          </Link>
        </Form>
      </div>
      {/* Display error if present */}
      {error && <Alert variant="danger" role="alert">{error}</Alert>}
    </div>
  );
};

export default SecurityInputDropdown;