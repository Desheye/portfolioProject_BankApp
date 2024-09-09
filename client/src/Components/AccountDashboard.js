import React, { useEffect, useState } from "react";
import {
  FaPaperPlane,
  FaInbox,
  FaFileInvoiceDollar,
  FaEllipsisH,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { fetchUserData } from '../services/authService'; // Import your service
import "../css/accountDashboard.css";

const AccountDashboard = () => {
  const [userData, setUserData] = useState({
    fullname: '',
    accountNumber: '',
    accountBalance: 0
  });

  useEffect(() => {
    const userSecurity = localStorage.getItem('userSecurity');
    console.log(userSecurity);

    if (userSecurity) {
      const { type, value } = JSON.parse(userSecurity);

      const loadUserData = async () => {
        try {
          const data = await fetchUserData(type, value);
          console.log(data);
          
          setUserData({
            fullname: data.fullname,
            accountNumber: data.accountNumber,
            accountBalance: data.balance
          });
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      loadUserData();
    } else {
      console.error("No security data found in localStorage");
    }
  }, []);

  return (
    <div className="account-dashboard">
      <div className="card-row">
        <div className="dashboard-card">
          <FaPaperPlane className="card-icon" />
          <p className="card-text">Send</p>
        </div>

        <div className="dashboard-card">
          <FaInbox className="card-icon" />
          <p className="card-text">Receive</p>
        </div>
        <div className="dashboard-card">
          <FaFileInvoiceDollar className="card-icon" />
          <p className="card-text">Utility Bills</p>
        </div>
        <div className="dashboard-card">
          <FaEllipsisH className="card-icon" />
          <p className="card-text">More</p>
        </div>
      </div>

      <div className="dashboard-info">
        <img
          src="account-holder-image-url"
          alt="Account Holder"
          className="account-image"
        />
        <div className="account-details">
          <h2 className="account-name">{userData.fullname || 'Account Holder Name'}</h2>
          <p className="account-number">Account Number: {userData.accountNumber || '***786'}</p>
          <p className="account-balance">Current Balance: N{userData.accountBalance ? userData.accountBalance.toLocaleString() : '--,--'}</p>
        </div>
      </div>

      <Link to="/account" className="back-link">
        <h3 className="back-text">Go Back To Accounts</h3>
      </Link>
    </div>
  );
};

export default AccountDashboard;
