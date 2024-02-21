import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { clearToken, getToken, isTokenExpired } from '../../utils/GoogleToken';
import ApiService from '../../Services/ApiService';
import PaymentService from '../../Services/PaymentService';
import UserService from '../../Services/UserService';
import ApiResponseDTO from '../../Interfaces/DTOs/ApiResponseDTO';
import UserDTO from '../../Interfaces/DTOs/UserDTO';

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
    const token = getToken();
    const apiService = new ApiService;
    const paymentService = new PaymentService(apiService);
    const userService = new UserService(apiService);
    const [, setPaymentHistory] = useState([]);
    const [user, setUser] = useState<UserDTO>({
        firstName: '',
        lastName: '',
        email: '',
        userId: 0,
        profilePicture: undefined
    });

    const fetchUserProfile = async () => {
        try {
            if (token) {
                const response: ApiResponseDTO = await userService.fetchUser();
                const userData = response.data;
                if (response.succeed) {
                    setUser(userData);
                }
            }
        } catch (error) {
            console.error('Error during user profile fetch:', error);
        }
    };

    const fetchPaymentHistory = async () => {
        try {
            if (token) {
                const response: ApiResponseDTO = await paymentService.getPaymentById(Number(user.userId));
                setPaymentHistory(response.data);
            }
        } catch (error) {
            console.error('Error fetching payment history:', error);
        }
    };

    useEffect(() => {
        if (token) {
            fetchUserProfile();
        }
        if (isTokenExpired()) {
            clearToken();
        }
    }, [token]);

    useEffect(() => {
        fetchPaymentHistory();
    },);

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