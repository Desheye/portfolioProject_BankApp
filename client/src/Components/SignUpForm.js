import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/signUpForm.css';
import Modal from './Modal'; // Importing the Modal component

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    tel: '',
    password: '',
    confirm_password: ''
  });
  const [submitStatus, setSubmitStatus] = useState(null);
  const [userDetails, setUserDetails] = useState(null); // State to hold user details for the modal

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      console.log('Server response:', result);
      if (response.ok) {
        setSubmitStatus('success');
        setUserDetails({
          fullname: formData.fullname,
          accountNumber: result.accountNumber,
          pin: result.pin
        });
        setFormData({
          fullname: '',
          email: '',
          tel: '',
          password: '',
          confirm_password: ''
        });
      } else {
        setSubmitStatus('failure');
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('failure');
    }
  };

  const closeModal = () => {
    setSubmitStatus(null);
    setUserDetails(null);
  };

  return (
    <div className="open_account">
      <h1>Welcome</h1>
      <h1>Create Account Here</h1>
      <form onSubmit={handleSubmit}>
        <div className="inputbox">
          <input type="text" name="fullname" required="required" onChange={handleChange} value={formData.fullname} />
          <span>Full Name</span>
        </div>
        <div className="inputbox">
          <input type="email" name="email" required="required" onChange={handleChange} value={formData.email} />
          <span>Email</span>
        </div>
        <div className="inputbox">
          <input type="tel" name="tel" required="required" onChange={handleChange} value={formData.tel} />
          <span>Phone Number</span>
        </div>
        <div className="inputbox">
          <input type="password" name="password" required="required" onChange={handleChange} value={formData.password} />
          <span>Password</span>
        </div>
        <div className="inputbox">
          <input type="password" name="confirm_password" required="required" onChange={handleChange} value={formData.confirm_password} />
          <span>Confirm Password</span>
        </div>
        <div className='submit-btn'>
          <button className='btn'>Submit</button>
        </div>
      </form>

      {submitStatus === 'success' && userDetails && (
        <Modal 
          fullname={userDetails.fullname} 
          accountNumber={userDetails.accountNumber} 
          pin={userDetails.pin} 
          onClose={closeModal} 
        />
      )}

      <Link to='/account' className='linktag'>
        <h3 className='back'>Go Back To Accounts</h3>
      </Link>
    </div>
  );
};

export default SignUpForm;
