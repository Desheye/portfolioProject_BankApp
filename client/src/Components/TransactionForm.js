import React, { useEffect, useState } from 'react';
import { Card, Accordion } from 'react-bootstrap';
import { TransactionModel } from './TransactionModel';
import { fetchTransactionData } from '../api/userApi';

function TransactionForm() {
  const [currentTransaction, setCurrentTransaction] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const getTransactionData = async () => {
      try {
        const data = await fetchTransactionData();
        setCurrentTransaction(data);
      } catch (error) {
        console.error('Error in fetching transaction data:', error);
      } finally {
        setLoading(false);
      }
    };
    getTransactionData(); 
  }, []);

  if (loading) {
    return <p>Loading transaction data...</p>;
  }

  return (
    <div>
      <h1>Transaction Card</h1>
      {!currentTransaction ? (
        <p>No transaction data available.</p>
      ) : (
        <Card className="transaction-card w-100 mx-auto my-4 transaction-form">
          <Card.Header className="transaction-header">Latest Transaction Details</Card.Header>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0" className="transaction-accordion-item">
              <Accordion.Header className="transaction-accordion-header">View Details</Accordion.Header>
              <Accordion.Body className="transaction-accordion-body">
                {TransactionModel.map(({ key, label }) => (
                  <p key={key} className="transaction-detail">
                    <strong>{label}:</strong> {currentTransaction[key]}
                  </p>
                ))}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Card>
      )}
    </div>
  );
}

export default TransactionForm;
