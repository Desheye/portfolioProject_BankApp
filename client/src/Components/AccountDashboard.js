import React, { useEffect, useState } from "react";
import { fetchUserData } from '../services/authService'; // This should be already implemented
import "../css/accountDashboard.css";

const AccountDashboard = () => {
  const [userData, setUserData] = useState({
    fullname: '',
    accountNumber: '',
    accountBalance: 0,
    imageUrl: ''
  });

  useEffect(() => {
    const userSecurity = localStorage.getItem('userSecurity');
    if (userSecurity) {
      const { type, value } = JSON.parse(userSecurity);
      fetchUserData(type, value)
        .then((data) => {
          setUserData({
            fullname: data.fullname,
            accountNumber: data.accountNumber,
            accountBalance: data.balance,
            imageUrl: data.imageUrl || 'default-image-url'
          });
        })
        .catch(error => {
          console.error('Failed to fetch user data:', error);
        });
    } else {
      console.error('No user security data found in localStorage');
    }
  }, []);

  return (
    <div className="account-dashboard">
      <div className="user-info">
        <img
          src={userData.imageUrl}
          alt={`${userData.fullname}'s profile`}
          className="profile-image"
        />
        <h2>{userData.fullname}</h2>
        <p>Account Number: {userData.accountNumber}</p>
        <p>Account Balance: ${userData.accountBalance}</p>
      </div>
    </div>
  );
};

export default AccountDashboard;