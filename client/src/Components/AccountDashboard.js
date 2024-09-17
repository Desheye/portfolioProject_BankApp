// src/Components/AccountDashboard.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaPaperPlane, FaInbox, FaFileInvoiceDollar, FaEllipsisH } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';
import '../css/accountDashboard.css';

const AccountDashboard = () => {
  // Access user data from Redux store
  const { userInfo } = useSelector((state) => state.user || {});

  // Access the 'user' object from userInfo
  const user = userInfo?.user || {}; // Fallback to empty object if userInfo or user is undefined

  if (!userInfo || !user.fullname) {
    return <div>Please log in to view your dashboard.</div>;
  }

  // Features array for navigation
  const features = [
    { icon: <FaPaperPlane size={30} />, title: "Send Money", description: "Transfer funds to others", link: "/send-money" },
    { icon: <FaInbox size={30} />, title: "Inbox", description: "Check your recent messages", link: "/inbox" },
    { icon: <FaFileInvoiceDollar size={30} />, title: "Transactions", description: "View recent transactions", link: "/transaction-form" },
    { icon: <FaEllipsisH size={30} />, title: "More", description: "Explore more features", link: "/more" }
  ];

  return (
    <Container className="py-5 account-dashboard">
      <Row className="mb-4 g-3">
        {features.map((feature, index) => (
          <Col key={index} lg={3} md={6} sm={12}>
            <RouterLink to={feature.link} className="text-decoration-none">
              <Card className="h-100 feature-card">
                <Card.Body className="d-flex flex-column align-items-center justify-content-center text-center">
                  <div className="feature-icon mb-3">{feature.icon}</div>
                  <Card.Title>{feature.title}</Card.Title>
                  <Card.Text>{feature.description}</Card.Text>
                </Card.Body>
              </Card>
            </RouterLink>
          </Col>
        ))}
      </Row>

      <Card className="user-info-card mt-4">
        <Card.Body>
          {/* Display user information from Redux store */}
          <h3 className="user-name">{user.fullname || "Account Holder Name"}</h3>
          <p className="account-number">Account Number: {user.accountNumber || "***786"}</p>
          <p className="account-balance">Current Balance: ₦{user.currentBalance || "--,--"}</p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AccountDashboard;
