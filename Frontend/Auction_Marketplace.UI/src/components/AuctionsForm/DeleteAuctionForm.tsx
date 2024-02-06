import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../Services/ApiService';
import AuctionService from '../../Services/AuctionService';
import ApiResponseDTO from '../../Interfaces/DTOs/ApiResponseDTO';
import AuctionDTO from '../../Interfaces/DTOs/AuctionDTO';

interface DeleteAuctionFormProps {
    onClose: () => void;
    auctionId: number;
    initialAuctionData: AuctionDTO | null;
}

const apiService = new ApiService();
const auctionService = new AuctionService(apiService);

const DeleteAuctionForm: React.FC<DeleteAuctionFormProps> = ({ auctionId, onClose, initialAuctionData }) => {

    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleDelete = async () => {
        try {
            const response: ApiResponseDTO = await auctionService.deleteAuction(auctionId);
            if (response.succeed) {
                alert('Succesfully deleted auction {auction.name}');
                navigate('/auctions');
            } else {
                setErrorMessage(response.message || 'Failed to delete auction.');
            }
        } catch (error) {
            console.error('Error deleting auction:', error);
            setErrorMessage('Failed to delete auction.');
        }
    };

    return (
        <div className="delete-auction-form">
            <p>Are you sure you want to delete this auction?</p>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default DeleteAuctionForm;
