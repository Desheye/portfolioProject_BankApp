// components/SignUpForm.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'; // Added missing import
import { signUpUser } from '../actions/userActions';
import "../css/signUpForm.css";

const SignUpForm = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    tel: '',
    password: '',
    confirm_password: '',
  });

  const dispatch = useDispatch();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signUpUser(formData));
  };

  return (
    <div className="open_account">
      <h1>Welcome</h1>
      <h1>Create Account Here</h1>
      <form onSubmit={handleSubmit}>
        <div className="inputbox">
          <input 
            type="text" 
            name="fullname" 
            required 
            autoComplete="name" 
            onChange={handleChange} 
            value={formData.fullname} 
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
          />
          <span>Email</span>
        </div>
        <div className="inputbox">
          <input 
            type="tel" 
            name="tel" 
            required 
            autoComplete="tel" 
            onChange={handleChange} 
            value={formData.tel} 
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
          />
          <span>Confirm Password</span>
        </div>
        <div className='submit-btn'>
          <button className='btn' type="submit">Submit</button>
        </div>
      </form>

      {/* This input seems redundant as it's already in the form above */}
      {/* <input
        type="text"
        name="fullname"
        value={formData.fullname}
        onChange={handleChange}
        placeholder="Full Name"
        required
      /> */}

      <Link to='/account' className='linktag'>
        <h3 className='back'>Go Back To Accounts</h3>
      </Link>
    </div>
  );
};

export default SignUpForm;