import React, { useState, useEffect } from "react";
import { fetchRecipientName, submitTransaction } from '../api/transactionApi';
import '../css/sendMoney.css';

const SendMoneyForm = () => {
  const [accountNumber, setAccountNumber] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("NGR");
  const [transferMethod, setTransferMethod] = useState("instant");
  const [memo, setMemo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [transactionStatus, setTransactionStatus] = useState(null); // To display success or error message

  const handleAccountNumberChange = (event) => {
    setAccountNumber(event.target.value);
  };

  useEffect(() => {
    if (accountNumber.length === 10) {
      setIsLoading(true);
      setError("");
      fetchRecipientName(accountNumber)
        .then((data) => {
          // Log data to ensure `fullname` exists in the response
          console.debug('Recipient fetched:', data);
          setRecipientName(data.fullname); // Ensure `data.fullname` is correct
        })
        .catch((err) => {
          setError("Recipient not found");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setRecipientName("");
    }
  }, [accountNumber]);
  

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const transactionDetails = {
      accountNumber,
      fullname: recipientName,
      //fullname, 
      amount,
      currency,
      transferMethod,
      memo,
    };
  
    try {
      console.debug('Attempting to submit transaction with:', transactionDetails);
      const response = await submitTransaction(transactionDetails);
      console.debug('Transaction successful:', response);
      setTransactionStatus('Transaction successful!');
    } catch (error) {
      console.error('Transaction failed:', error);
      setTransactionStatus('Transaction failed. Please try again.');
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="send-money-container">
      <div className="send-money-grid">
        <div className="send-money-form-group">
          <label htmlFor="recipientAccountNumber" className="send-money-label">
            Recipient Account Number
          </label>
          <input
            type="text"
            id="recipientAccountNumber"
            className="send-money-input"
            value={accountNumber}
            onChange={handleAccountNumberChange}
            required
          />
        </div>

        <div className="send-money-form-group">
          <label className="send-money-label">Recipient Name</label>
          <div className="send-money-recipient-name">
            {isLoading ? "Searching..." : recipientName || error || "Enter a valid account number"}
          </div>
        </div>

        <div className="send-money-form-group">
          <label htmlFor="amount" className="send-money-label">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            className="send-money-input"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <div className="select-group">
          <div className="send-money-form-group">
            <label htmlFor="currency" className="send-money-label">
              Currency
            </label>
            <select
              id="currency"
              className="send-money-select"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <option>NGR</option>
              <option>USD</option>
              <option>EUR</option>
              <option>GBP</option>
            </select>
          </div>

          <div className="send-money-form-group">
            <label htmlFor="transferMethod" className="send-money-label">
              Transfer Method
            </label>
            <select
              id="transferMethod"
              className="send-money-select"
              value={transferMethod}
              onChange={(e) => setTransferMethod(e.target.value)}
            >
              <option value="instant">Instant Transfer</option>
              <option value="scheduled">Scheduled Transfer</option>
              <option value="recurring">Recurring Transfer</option>
            </select>
          </div>
        </div>

        <div className="send-money-form-group">
          <label htmlFor="memo" className="send-money-label">
            Memo (Optional)
          </label>
          <input
            type="text"
            id="memo"
            className="send-money-input"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
          />
        </div>

        <button type="submit" className="send-money-button">
          Send Money
        </button>

        {transactionStatus && (
          <div className="transaction-status">
            {transactionStatus}
          </div>
        )}
      </div>
    </form>
  );
};

export default SendMoneyForm;
