import React, { useEffect, useState } from 'react';
import './PaymentCauseForm.css'
import CauseService from '../../Services/CauseService';
import ApiService from '../../Services/ApiService';

interface PaymentsFormProps {
  causeId: number; 
  onClose: () => void; 
}

const PaymentCauseForm: React.FC<PaymentsFormProps> = ({ causeId, onClose }) => {  
    const [payments, setPayments] = useState<any[]>([]);
    const apiService = new ApiService();
    const causeService = new CauseService(apiService);

    useEffect(() => {
        const fetchPayments = async () => {
          try {
            const paymentData = await causeService.fetchPaymentsByCauseId(causeId);
            setPayments(paymentData);
          } catch (error) {
            console.error('Error fetching payments:', error);
          }
        };
    
        fetchPayments();
      }, [causeId]);

  return (
    <div className="payments-form-container">
      <h3 className='header-payment-history'>Payments History</h3>
      <ul>
        {payments.map((payment, index) => (
          <li key={index}>{payment.amount}</li>
        ))}
      </ul>
      <div className="form-buttons">
        <button type="button" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default PaymentCauseForm;
