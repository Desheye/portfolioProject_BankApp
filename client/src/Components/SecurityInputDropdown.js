import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/inputDropdown.css';
import { verifyCredentials } from '../services/authService';

const SecurityInputDropdown = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const timeoutRef = useRef(null);
  const inactivityTimeoutRef = useRef(null);

  const resetState = () => {
    setSelectedOption(null);
    setInputValue('');
    setIsDropdownOpen(false);
  };

  const startTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(resetState, 5000);
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(prev => !prev);
    startTimeout();
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setInputValue('');
    startTimeout();
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;

    if (selectedOption === 'pin' && !/^\d+$/.test(inputValue)) {
      alert('Please enter a valid numeric PIN');
      return;
    }
    if (selectedOption === 'password' && inputValue.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }

    setInputValue(inputValue);
    startTimeout();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedOption) {
      alert('Please select a security type');
      return;
    }

    if (!inputValue) {
      alert(`Please enter your ${selectedOption}`);
      return;
    }

    try {
      const isValid = await verifyCredentials(selectedOption, inputValue);
      if (isValid) {
        // Store the user's security info in localStorage
        localStorage.setItem('userSecurity', JSON.stringify({ type: selectedOption, value: inputValue }));
        navigate('/account-dashboard');
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Error verifying credentials:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const startInactivityTimeout = useCallback(() => {
    if (inactivityTimeoutRef.current) clearTimeout(inactivityTimeoutRef.current);
    inactivityTimeoutRef.current = setTimeout(resetState, 5000);
  }, []);

  useEffect(() => {
    const handleUserActivity = () => {
      startInactivityTimeout();
    };

    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('keydown', handleUserActivity);

    return () => {
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
    };
  }, [startInactivityTimeout]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (inactivityTimeoutRef.current) {
        clearTimeout(inactivityTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="login-dropdown">
      <form onSubmit={handleSubmit}>
        <div className="dropdown" role="menu" aria-label="Security Type">
          <button
            type="button"
            className="dropdown-button"
            onClick={handleDropdownToggle}
            aria-haspopup="true"
            aria-expanded={isDropdownOpen}
          >
            Select Security Type
          </button>
          {isDropdownOpen && (
            <div className="dropdown-content">
              <button className='btn' type="button" onClick={() => handleOptionSelect('pin')} role="menuitem">PIN</button>
              <button className='btn' type="button" onClick={() => handleOptionSelect('password')} role="menuitem">Password</button>
            </div>
          )}
        </div>
        {selectedOption && (
          <div className='blocLayout'>
            <input
              type={selectedOption === 'pin' ? 'number' : 'password'}
              placeholder={`Enter ${selectedOption}`}
              value={inputValue}
              onChange={handleInputChange}
            />
            <button type="submit" className="submit-button">Submit</button>
          </div>
        )}
      </form>
      <Link to='/account' className='back'>
        <h3>Go Back To Accounts</h3>
      </Link>
    </div>
  );
};

export default SecurityInputDropdown;
