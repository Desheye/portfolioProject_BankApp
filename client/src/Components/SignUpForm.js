// src/Components/SignUpForm.js
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../store/actions/userActions';
import { Link } from 'react-router-dom';
import SignUpSuccessModal from './SignUpSuccessModal';
import "../css/signUpForm.css";

// Define the initial form state
const initialFormState = {
  fullname: '',
  email: '',
  tel: '',
  password: '',
  confirm_password: '',
};

// Create a functional component for SignUpForm
const SignUpForm = () => {
  // Create state variables for form data, show modal, error message, and reset flag
  const [formData, setFormData] = useState(initialFormState);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [shouldReset, setShouldReset] = useState(false);

  // Define a ref for the error message timeout
  const errorMessageTimeoutRef = useRef(null);

  // Get the dispatch function and user state from Redux
  const dispatch = useDispatch();
  const { user = {}, error } = useSelector((state) => state.user || {});

  // Define a callback function to reset the form
  const resetForm = useCallback(() => {
    // Reset the form data to its initial state
    setFormData(initialFormState);
    // Clear the error message
    setErrorMessage('');
    // Set the reset flag to false
    setShouldReset(false);
  }, []);

  // Define a change handler function for form fields
  const handleChange = (e) => {
    // Update the form data with the new value
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Define a submit handler function for the form
  const handleSubmit = (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();
    // Check if passwords match
    if (formData.password !== formData.confirm_password) {
      // Alert the user if passwords don't match
      return alert('Passwords do not match');
    }
    // Dispatch the signupUser action with the form data
    dispatch(signupUser(formData))
      .then(() => {
        // If the user has been created, show the success modal and reset the form
        setShowModal(true);
        setShouldReset(true);
      })
      .catch((error) => {
        // Handle promise rejection
        setErrorMessage(error.message);
      })
      .finally(() => {
        // Clear the timeout for hiding the error message
        clearTimeout(errorMessageTimeoutRef.current);
      });
  };

  // Define a close handler function for the success modal
  const handleClose = () => {
    // Hide the success modal
    setShowModal(false);
    // Reset the form
    resetForm();
  };

  // Define an effect to handle changes to the user state
  useEffect(() => {
    // If the user has been created and the reset flag is true, reset the form
    if (shouldReset && user.fullname) {
      resetForm();
    }
    // If there's an error, set the error message
    if (error) {
      setErrorMessage(error.message);
      // Set a timeout to hide the error message after 5 seconds
      const errorMessageTimeout = setTimeout(() => {
        setErrorMessage('');
      }, 5000);
      errorMessageTimeoutRef.current = errorMessageTimeout;
    }
  }, [shouldReset, user, error, resetForm]);

  // Return the JSX for the SignUpForm component
  return (
    <div className="open_account">
      <h1>Welcome</h1>
      <h1>Create Account Here</h1>

      <form onSubmit={handleSubmit}>
        {/* Form fields remain the same */}
        <div className="inputbox">
          <input
            type="text"
            name="fullname"
            required
            autoComplete="name"
            onChange={handleChange}
            value={formData.fullname}
            aria-label="Full Name"
          />
          <span>Full Name</span>
        </div>

        <div className="inputbox">
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            onChange={handleChange}
            value={formData.email}
            aria-label="Email"
          />
          <span>Email</span>
        </div>

        <div className="inputbox">
          <input
            type="text"
            name="tel"
            required
            onChange={handleChange}
            value={formData.tel}
            aria-label="Phone Number"
          />
          <span>Phone Number</span>
        </div>

        <div className="inputbox">
          <input
            type="password"
            name="password"
            required
            autoComplete="new-password"
            onChange={handleChange}
            value={formData.password}
            aria-label="Password"
          />
          <span>Password</span>
        </div>

        <div className="inputbox">
          <input
            type="password"
            name="confirm_password"
            required
            autoComplete="new-password"
            onChange={handleChange}
            value={formData.confirm_password}
            aria-label="Confirm Password"
          />
          <span>Confirm Password</span>
        </div>

        <div className='submit-btn'>
          <button className='btn' type="submit">Submit</button>
        </div>

        <Link to='/account' className='linktag'>
        <h3 className='back'>Go Back To Accounts</h3>
      </Link>
      </form>

      {errorMessage && (
        <div className="error-message">
          {errorMessage}
        </div>
      )}

      <SignUpSuccessModal
        show={showModal}
        handleClose={handleClose}
        user={user}
      />
    </div>
  );
};

export default SignUpForm;
