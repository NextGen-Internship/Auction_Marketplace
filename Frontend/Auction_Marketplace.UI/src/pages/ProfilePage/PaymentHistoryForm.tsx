import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { clearToken, getToken, isTokenExpired } from '../../utils/GoogleToken';
import ApiService from '../../Services/ApiService';
import PaymentService from '../../Services/PaymentService';
import UserService from '../../Services/UserService';
import ApiResponseDTO from '../../Interfaces/DTOs/ApiResponseDTO';
import PaymentDTO from '../../Interfaces/DTOs/PaymentDTO';

interface PaymentHistoryFormProps {
    onClose: () => void;
}

const PaymentHistoryForm: React.FC<PaymentHistoryFormProps> = ({onClose}) => {
    const token = getToken();
    const apiService = new ApiService;
    const paymentService = new PaymentService(apiService);
    const userService = new UserService(apiService);
    const [paymentHistory, setPaymentHistory] = useState<PaymentDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(false); 

    const fetchUserData = async () => {
        try {
            if (token) {
                const response: ApiResponseDTO = await userService.fetchUser();
                if (response.succeed) {
                    const userId = response.data.userId;
                    return userId;
                }
            }
        } catch (error) {
            console.error('Error during user profile fetch:', error);
        }
        return null;
    };

    const handleClose = () => {
        onClose();
        window.history.back();
    }

    const fetchPaymentHistory = async (userId: number | null) => {
        try {
            if (userId) {
                setLoading(true);
                const response = await paymentService.getPaymentByUserId();
                console.log(response);
                setPaymentHistory(response as unknown as PaymentDTO[]);
            }
        } catch (error) {
            console.error('Error fetching payment history:', error);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token && !isTokenExpired()) {
            const fetchUserProfileAndPaymentHistory = async () => {
                const userId = await fetchUserData();
                fetchPaymentHistory(userId);
            };
            fetchUserProfileAndPaymentHistory();
        } else {
            clearToken();
        }
    }, [token]);
    
    return (
        <div className='payment-history-container'>
            <FontAwesomeIcon icon={faTimes} className="close-icon" onClick={handleClose}/>
            <h2 className='header-payment-history-container'> Payment History</h2>
            {loading ? ( 
                <div>Loading...</div>
            ) : (
                <table className='table-history'>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Completed</th>
                            <th>Cause</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paymentHistory.map((payment, index) => (
                            <tr key={index}>
                                <td>{payment.createdAt}</td>
                                <td>{payment.amount}</td>
                                <td>{payment.isCompleted.toString()}</td>
                                <td>{payment.causeId}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default PaymentHistoryForm;