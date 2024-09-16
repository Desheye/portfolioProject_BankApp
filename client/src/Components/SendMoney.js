import React, { useState, useEffect } from 'react';

const SendMoney = () => {
  const [accountNumber, setAccountNumber] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('NGR');
  const [transferMethod, setTransferMethod] = useState('instant');
  const [memo, setMemo] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const fetchRecipientName = async () => {
      if (accountNumber.length >= 10) { // Assuming account numbers are at least 10 digits
        try {
          // Replace this with an actual API call in a real application
          const response = await fetch(`https://api.example.com/recipient-name/${accountNumber}`);
          const data = await response.json();
          setRecipientName(data.name);
        } catch (error) {
          setRecipientName('Recipient not found');
        }
      } else {
        setRecipientName('');
      }
    };

    fetchRecipientName();
  }, [accountNumber]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the actual money transfer logic
    setShowConfirmation(true);
  };

  const handleAccountNumberChange = (e) => {
    const newAccountNumber = e.target.value;
    setAccountNumber(newAccountNumber);
    
    // Reset recipient name when account number changes
    setRecipientName('');
  };

  return (
    <div className="container">
      <div className="form">
        <h2 className="title">Send Money</h2>
        
        {showConfirmation ? (
          <div className="alert">
            <div className="alertTitle">Success!</div>
            <div>
              Your transfer of {amount} {currency} to {recipientName} has been initiated.
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="inputGroup">
              <label htmlFor="accountNumber" className="label">Recipient Account Number</label>
              <input
                type="text"
                id="accountNumber"
                value={accountNumber}
                onChange={handleAccountNumberChange}
                className="input"
                required
              />
            </div>

            {accountNumber && (
              <div className="inputGroup">
                <label className="label">Recipient Name</label>
                <div className="recipientName">{recipientName || 'Searching...'}</div>
              </div>
            )}
            
            <div className="inputGroup">
              <label htmlFor="amount" className="label">Amount</label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="input"
                required
              />
            </div>
            
            <div className="inputGroup">
              <label htmlFor="currency" className="label">Currency</label>
              <select
                id="currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="select"
              >
                <option>NGR</option>
                <option>USD</option>
                <option>EUR</option>
                <option>GBP</option>
              </select>
            </div>
            
            <div className="inputGroup">
              <label htmlFor="transferMethod" className="label">Transfer Method</label>
              <select
                id="transferMethod"
                value={transferMethod}
                onChange={(e) => setTransferMethod(e.target.value)}
                className="select"
              >
                <option value="instant">Instant Transfer</option>
                <option value="scheduled">Scheduled Transfer</option>
                <option value="recurring">Recurring Transfer</option>
              </select>
            </div>
            
            <div className="inputGroup">
              <label htmlFor="memo" className="label">Memo (Optional)</label>
              <input
                type="text"
                id="memo"
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                className="input"
              />
            </div>
            
            <button type="submit" className="button" disabled={!recipientName}>
              Send Money
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SendMoney;