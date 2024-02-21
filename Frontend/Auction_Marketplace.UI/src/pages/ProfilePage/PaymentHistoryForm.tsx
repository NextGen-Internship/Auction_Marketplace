import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface Payment {
    date: string;
    amount: number;
    isCompleted: boolean;
}

interface PaymentHistoryFormProps {
    paymentHistory: Payment[];
    setShowHistory: React.Dispatch<React.SetStateAction<boolean>>;
}

const PaymentHistoryForm: React.FC<PaymentHistoryFormProps> = ({ paymentHistory, setShowHistory }) => {
    return (
        <div className='payment-history-container'>
            <FontAwesomeIcon icon={faTimes} className="close-icon" onClick={() => setShowHistory(false)} />
            <h2 className='header-payment-history-container'> Payment History</h2>
            <table className='table-history'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Completed</th>
                    </tr>
                </thead>
                <tbody>
                    {paymentHistory.map((payment, index) => (
                        <tr key={index}>
                            <td>{payment.date}</td>
                            <td>{payment.amount}</td>
                            <td>{payment.isCompleted ? 'Completed' : 'Pending'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default PaymentHistoryForm;