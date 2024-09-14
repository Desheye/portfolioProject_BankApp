// components/AccountDashboard.js
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Card } from 'react-bootstrap';
import { FaPaperPlane, FaInbox, FaFileInvoiceDollar, FaEllipsisH } from 'react-icons/fa';
import '../css/accountDashboard.css';

const AccountDashboard = () => {
  // Extract user data from Redux store
  const { fullname, accountNumber, accountBalance } = useSelector(state => state.user);

  // Log user state for debugging purposes
  useEffect(() => {
    console.log('User state:', { fullname, accountNumber, accountBalance });
  }, [fullname, accountNumber, accountBalance]);

  // Helper function to render a feature card
  const renderFeatureCard = (icon, title, description) => (
    <Col md={3}>
      <Card>
        <Card.Body>
          {icon}
          <Card.Title>{title}</Card.Title>
          <Card.Text>{description}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );

  return (
    <div className="account-dashboard">
      {/* Feature cards row */}
      <Row className="mb-4">
        {renderFeatureCard(<FaPaperPlane size={30} className="mb-2" />, "Send Money", "Transfer funds to others")}
        {renderFeatureCard(<FaInbox size={30} className="mb-2" />, "Inbox", "Check your recent messages")}
        {renderFeatureCard(<FaFileInvoiceDollar size={30} className="mb-2" />, "Transactions", "View recent transactions")}
        {renderFeatureCard(<FaEllipsisH size={30} className="mb-2" />, "More", "Explore more features")}
      </Row>

      {/* User information section */}
      <div className="user-info">
        <h3>{fullname || 'Account Holder Name'}</h3>
        <p>Account Number: {accountNumber || '***786'}</p>
        <p>Current Balance: ₦{accountBalance ? accountBalance.toLocaleString() : '--,--'}</p>
      </div>
    </div>
  );
};

export default AccountDashboard;