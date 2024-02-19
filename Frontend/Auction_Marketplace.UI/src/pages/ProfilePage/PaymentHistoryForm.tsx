import React from 'react';

interface Payment {
    date: string;
    amount: number;
    isCompleted: boolean;
  }
    
const PaymentHistoryForm = ({ paymentHistory }) => {
  return (
    <div className='payment-history-container'>
      <h2 className='header-payment-history-container'> Payment History</h2>
      <table className='table-history'>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>IsCompleted</th>
          </tr>
        </thead>
        <tbody>
          {paymentHistory.map((payment, index) => (
            <tr key={index}>
              <td>{payment.data}</td>
              <td>{payment.amount}</td>
              <td>{payment.isCompleted}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default PaymentHistoryForm;