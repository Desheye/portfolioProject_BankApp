// src/Components/SignUpSuccessModal.js
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const SignUpSuccessModal = ({ show, handleClose, user }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Signup Successful</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <p>Congratulations <strong>{user.fullname}</strong>, your account has been created with:</p>
          <p><strong>Account Number:</strong> {user.accountNumber}</p>
          <p><strong>PIN:</strong> {user.pin}</p>
          <p>You are advised to change your PIN in the account dashboard to a 4-digit number of your choice.</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SignUpSuccessModal;