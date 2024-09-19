import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from 'react-router-dom';
import SuccessModal from "../Modal/SuccessModal";
import "../css/sendMoney.css";

// Utility function to format currency
const formatCurrency = (amount, currencyCode) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 2,
  }).format(amount);
};

const SendMoney = () => {
  const { userInfo } = useSelector((state) => state.user || {});
  const senderAccountNumber = userInfo?.user?.accountNumber;

  const [accountNumber, setAccountNumber] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("NGR");
  const [transferMethod, setTransferMethod] = useState("instant");
  const [memo, setMemo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [transactionStatus, setTransactionStatus] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Dynamically format the amount based on the selected currency
  const formattedAmount = formatCurrency(amount, currency);

  const handleAccountNumberChange = (event) => {
    setAccountNumber(event.target.value);
  };

  useEffect(() => {
    if (accountNumber.length === 10) {
      setIsLoading(true);
      setError("");
      axios
        .get(`/api/users/get-recipient/${accountNumber}`)
        .then((response) => {
          setRecipientName(response.data.fullname);
          setIsLoading(false);
        })
        .catch(() => {
          setError("Recipient not found");
          setIsLoading(false);
        });
    }
  }, [accountNumber]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const transactionDetails = {
      senderAccountNumber,
      recipientAccountNumber: accountNumber,
      fullname: recipientName,
      amount: parseFloat(amount),
      currency,
      transferMethod,
      memo,
    };

    try {
      await axios.post("/api/users/submit-transaction", transactionDetails);
      setTransactionStatus("Transaction successful!");
      setShowSuccessModal(true);

      // Clear form fields after success
      setAccountNumber("");
      setRecipientName("");
      setAmount("");
      setCurrency("NGR");
      setTransferMethod("instant");
      setMemo("");
    } catch (error) {
      setTransactionStatus("Transaction failed. Please try again.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="send-money-container">
        <div className="send-money-grid">
          <div className="send-money-form-group">
            <label
              htmlFor="recipientAccountNumber"
              className="send-money-label"
            >
              Recipient Account Number
            </label>
            <input
              type="text"
              id="recipientAccountNumber"
              className="send-money-input"
              value={accountNumber}
              onChange={handleAccountNumberChange}
              placeholder="Recipient Account Number"
              required
            />
          </div>

          <div className="send-money-form-group">
            <label className="send-money-label">Recipient Name</label>
            <div className="send-money-recipient-name">
              {isLoading
                ? "Searching..."
                : recipientName || error || "Enter a valid account number"}
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
                <option value="NGR">NGR</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
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

          <div className="formattedAmount">
            <label className="send-money-label">Formatted Amount</label>
            <div className="formatted-amount">
              {formattedAmount} {/* Display the formatted amount here */}
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
            <div className="transaction-status">{transactionStatus}</div>
          )}
        </div>
      </form>

      <div className="back-link-container link-container">
        <Link to="/account-dashboard" className="linktag">
          <h3 className="back">My Dashboard</h3>
        </Link>
        <Link to="/account" className="linktag">
          <h3 className="back">Go Back To Accounts</h3>
        </Link>
      </div>

      {showSuccessModal && (
        <SuccessModal onClose={() => setShowSuccessModal(false)} />
      )}
    </>
  );
};

export default SendMoney;
