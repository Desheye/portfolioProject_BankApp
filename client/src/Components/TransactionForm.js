//src/Components/TransactionForm.js
import React from 'react';
import '../css/transactionForm.css'; // Assuming you have a CSS file for styling

const TransactionForm = () => {
  return (
    <div className="transaction-form">
      <div className="account-holder">
        <img src="account-holder-image-url" alt="Account Holder" className="account-image" />
      </div>
      <form>
        <div className="input-container">
          <label htmlFor="sender">Sender</label>
          <input id="sender" type="text" placeholder="Sender" />
        </div>
        <div className="input-container">
          <label htmlFor="receiver">Receiver</label>
          <input id="receiver" type="text" placeholder="Receiver" />
        </div>
        <div className="input-container">
          <label htmlFor="amount">Amount</label>
          <input id="amount" type="number" placeholder="Amount" />
        </div>
        <button type="submit" className="send-button">Send</button>
      </form>
    </div>
  );
};

export default TransactionForm;
