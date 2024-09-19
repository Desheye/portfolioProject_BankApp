import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Card } from "react-bootstrap";
import {
  FaPaperPlane,
  FaInbox,
  FaFileInvoiceDollar,
  FaEllipsisH,
} from "react-icons/fa";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import SendMoney from "./SendMoney";
import "../css/accountDashboard.css";
import { logoutUser } from "../store/actions/userActions";

const AccountDashboard = () => {
  const dispatch = useDispatch();
  const { userInfo, isAuthenticated } = useSelector(
    (state) => state.user || {}
  );
  const user = userInfo?.user || {};

  console.log("isAuthenticated:", isAuthenticated);
  console.log("userInfo:", userInfo);
  console.log("user:", user);

  const navigate = useNavigate();

  // Function to handle redirect to the login dropdown
  const redirectToLogin = () => {
    navigate("/login-dropdown");
  };

  // Log out the user and redirect when navigating back to /account
  const logoutAndRedirect = () => {
    dispatch(logoutUser()); // Clears user info from Redux and session storage
    navigate("/login-dropdown"); // Redirect to login
  };

  // Clear session when navigating away from the dashboard
  /*useEffect(() => {
    return () => {
      dispatch(logoutUser()); // Clear user session on unmount (navigating away)
    };
  }, [dispatch]);*/

  // Handle if the user is not authenticated
  if (!isAuthenticated) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Card
          className="p-5 text-center clickable-card"
          onClick={redirectToLogin}
        >
          <h5>Please log in to view your dashboard.</h5>
          <p className="text-muted">Click here to log in.</p>
        </Card>
      </Container>
    );
  }

  // Features array for navigation
  const features = [
    {
      icon: <FaPaperPlane size={30} />,
      title: "Send Money",
      description: "Transfer funds to others",
      link: "/send-money",
    },
    {
      icon: <FaInbox size={30} />,
      title: "Inbox",
      description: "Check your recent messages",
      link: "/inbox",
    },
    {
      icon: <FaFileInvoiceDollar size={30} />,
      title: "Transactions",
      description: "View recent transactions",
      link: "/transaction-form",
    },
    {
      icon: <FaEllipsisH size={30} />,
      title: "More",
      description: "Explore more features",
      link: "/more",
    },
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
          <h3 className="user-name">
            {user.fullname || "Account Holder Name"}
          </h3>
          <p className="account-number">
            Account Number: {user.accountNumber || "***786"}
          </p>
          <p className="account-balance">
            Current Balance: ₦{user.currentBalance || "--,--"}
          </p>
        </Card.Body>
      </Card>

      {/* Include SendMoney component and pass the senderAccountNumber */}
      <SendMoney senderAccountNumber={user.accountNumber} />

      {/* Logout button for session expiry on back navigation */}
      <button className="btn btn-danger mt-3" onClick={logoutAndRedirect}>
        Log Out
      </button>
    </Container>
  );
};

export default AccountDashboard;
