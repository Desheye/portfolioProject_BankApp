import React, { useEffect, useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { FaPaperPlane, FaInbox, FaFileInvoiceDollar, FaEllipsisH } from "react-icons/fa";
import { fetchUserData } from '../services/authService';
import "../css/accountDashboard.css";

const AccountDashboard = () => {
  const [userData, setUserData] = useState({
    fullname: '',
    accountNumber: '',
    accountBalance: 0
  });

  useEffect(() => {
    const userSecurity = localStorage.getItem('userSecurity');
    if (userSecurity) {
      const { type, value } = JSON.parse(userSecurity);
      const loadUserData = async () => {
        try {
          const data = await fetchUserData(type, value);
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
      {/* Cards Section */}
      <Row className="mb-4">
        <Col md={3}>
          <Card>
            <Card.Body>
              <FaPaperPlane size={30} className="mb-2" />
              <Card.Title>Send Money</Card.Title>
              <Card.Text>Transfer funds to others</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <FaInbox size={30} className="mb-2" />
              <Card.Title>Inbox</Card.Title>
              <Card.Text>Check your recent messages</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <FaFileInvoiceDollar size={30} className="mb-2" />
              <Card.Title>Transactions</Card.Title>
              <Card.Text>View recent transactions</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <FaEllipsisH size={30} className="mb-2" />
              <Card.Title>More</Card.Title>
              <Card.Text>Explore more features</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* User Information Section */}
      <div className="user-info">
        <h3>{userData.fullname || 'Account Holder Name'}</h3>
        <p>Account Number: {userData.accountNumber || '***786'}</p>
        <p>Current Balance: N{userData.accountBalance ? userData.accountBalance.toLocaleString() : '--,--'}</p>
      </div>
    </div>
  );
};

export default AccountDashboard;
