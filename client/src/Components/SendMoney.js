import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../css/sendMoney.css";
import {
  setAccountNumber,
  setAmount,
  setCurrency,
  setTransferMethod,
  setMemo,
  setRecipientAccountNumber,
  fetchRecipientName,
  submitTransaction,
} from "../store/actions/transactionActions";

/**
 * SendMoney component
 * Allows users to enter account details and transfer money.
 */
const SendMoney = () => {
  const dispatch = useDispatch();

  // State to handle confirmation display
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Use selectors to access state from Redux store
  const accountNumber = useSelector((state) => state.transaction?.accountNumber || "");
  const recipientName = useSelector((state) => state.transaction?.recipientName || "");
  const amount = useSelector((state) => state.transaction?.amount || "");
  const currency = useSelector((state) => state.transaction?.currency || "NGR");
  const transferMethod = useSelector((state) => state.transaction?.transferMethod || "instant");
  const memo = useSelector((state) => state.transaction?.memo || "");
  const transactionStatus = useSelector((state) => state.transaction?.transactionStatus || "");
  const recipientAccountNumber = useSelector((state) => state.transaction?.recipientAccountNumber || "");

  // Log transaction status for debugging purposes
  console.log("Transaction Status:", transactionStatus);

  useEffect(() => {
    if (accountNumber) {
      // Fetch recipient name from Redux or MongoDB if account number is updated
      dispatch(fetchRecipientName(accountNumber));
    }
  }, [accountNumber, dispatch]);

   // eslint-disable-next-line 
  const handleAccountNumberChange = (e) => {
  const value = e.target.value;
  dispatch(setAccountNumber(value)); // Dispatch action to update account number in Redux
  console.log("Account Number changed to:", value);
};

  const handleSubmit = (e) => {
    e.preventDefault();
    const transactionDetails = {
      accountNumber,
      recipientAccountNumber,
      recipientName,
      amount,
      currency,
      transferMethod,
      memo,
    };
    // Dispatch action to submit transaction
    dispatch(submitTransaction(transactionDetails));
    setShowConfirmation(true); // Show confirmation after submitting
    console.log("Transaction submitted:", transactionDetails);
  };

  return (
    <div className="send-money-container">
      <h2 className="send-money-title">Send Money</h2>

      {showConfirmation ? (
        <div className="send-money-alert">
          <div className="send-money-alert-title">Success!</div>
          <div>
            Your transfer of {amount} {currency} to {recipientName} has been initiated.
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="send-money-form">
          <div className="send-money-form-group">
            <label htmlFor="recipientAccountNumber" className="send-money-label">
              Recipient Account Number
            </label>
            <input
              type="text"
              id="recipientAccountNumber"
              value={recipientAccountNumber}
              onChange={(e) => dispatch(setRecipientAccountNumber(e.target.value))}
              className="send-money-input"
              required
            />
          </div>

          {recipientAccountNumber && (
            <div className="send-money-form-group">
              <label className="send-money-label">Recipient Name</label>
              <div className="send-money-recipient-name">
                {recipientName.fullname || "Searching..."}
              </div>
            </div>
          )}

          <div className="send-money-form-group">
            <label htmlFor="amount" className="send-money-label">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => dispatch(setAmount(e.target.value))}
              className="send-money-input"
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
                value={currency}
                onChange={(e) => dispatch(setCurrency(e.target.value))}
                className="send-money-select"
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
                value={transferMethod}
                onChange={(e) => dispatch(setTransferMethod(e.target.value))}
                className="send-money-select"
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
              value={memo}
              onChange={(e) => dispatch(setMemo(e.target.value))}
              className="send-money-input"
            />
          </div>

          <button
            type="submit"
            className="send-money-button"
            disabled={!recipientName}
          >
            Send Money
          </button>
        </form>
      )}

      <Link to="/account" className="send-money-link">
        <h3 className="send-money-back">Go Back To Accounts</h3>
      </Link>
    </div>
  );
};

export default SendMoney;
