import React, { useEffect, useState } from 'react';
import './PaymentCauseForm.css'
import CauseService from '../../Services/CauseService';
import ApiService from '../../Services/ApiService';
import PaymentService from '../../Services/PaymentService';

interface PaymentsFormProps {
    causeId: number;
    onClose: () => void;
}

const PaymentCauseForm: React.FC<PaymentsFormProps> = ({ causeId, onClose }) => {
    const [payments, setPayments] = useState<any[]>([]);
    const apiService = new ApiService();
    const causeService = new CauseService(apiService);
    const paymentService = new PaymentService(apiService);
    const [userId, setUserId] = useState('');
    const [user, setUser] = useState({
        userId,
        firstName: '',
        lastName: '',
        email: '',
        profilePicture: ''
    });

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const paymentData = await paymentService.getPaymentByCauseId(causeId);
                setPayments(paymentData.data);
            } catch (error) {
                console.error('Error fetching payments:', error);
            }
        };

        fetchPayments();
    }, [causeId]);

    return (
        <div className="payments-form-container">
            <h3 className='header-payment-history'>Payments History</h3>
            <table className='history-table'>
                <thead>
                    <tr>
                        <th className='th-rows-payment-history'>Email</th>
                        <th className='th-rows-payment-history'>Amount</th>
                        <th className='th-rows-payment-history'>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map((payment, index) => (
                        <tr key={index}>
                            <td className='td-rows-payment-history'>{payment.email}</td> 
                            <td className='td-rows-payment-history'>{payment.amount}</td>
                            <td className='td-rows-payment-history'>{payment.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="form-buttons">
                <button type="button" className='close-btn' onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default PaymentCauseForm;
