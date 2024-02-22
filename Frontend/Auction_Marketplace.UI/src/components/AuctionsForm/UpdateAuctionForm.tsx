import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import ApiService from '../../Services/ApiService';
import AuctionService from '../../Services/AuctionService';
import { useNavigate } from 'react-router-dom';

interface UpdateAuctionFormProps {
    onClose: () => void;
    auctionId: number;
    initialAuctionData: FormData;
}

interface FormData {
    name: string;
    description: string;
    photo: File | null;
}

const UpdateAuctionForm: React.FC<UpdateAuctionFormProps> = ({ onClose, auctionId, initialAuctionData }) => {

    const [formData, setFormData] = useState<FormData>({
        name: '',
        description: '',
        photo: null
    });

    const allowedFileTypes = ['image/jpeg', 'image/png'];
    const apiService = new ApiService();
    const auctionService = new AuctionService(apiService);
    const navigate = useNavigate();
    const [photoError, setPhotoError] = useState<string>('');
    const [submitted, setSubmitted] = useState<boolean>(false);

    useEffect(() => {
        if (initialAuctionData) {
            setFormData({
                name: initialAuctionData.name,
                description: initialAuctionData.description,
                photo: null
            });
        }
    }, [initialAuctionData]);


    const handleClose = () => {
        onClose();
        window.history.back();
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleUpdateAuction = async (e: FormEvent) => {
        e.preventDefault();
        setSubmitted(true);

        if (!formData.photo) {
            setPhotoError('Please upload a photo.');
            return;
        }
        else {
            try {
                const updatedAuction = await auctionService.updateAuction(auctionId, formData);
                navigate('/auctions');
                handleClose;

            } catch (error) {
                console.error('Error updating auction:', error);
            }
        };
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            if (allowedFileTypes.includes(file.type)) {
                setFormData((prevData) => ({
                    ...prevData,
                    photo: file,
                }));
                const reader = new FileReader();
                reader.onloadend = () => {
                };
                reader.readAsDataURL(file);

            } else {
                setFormData((prevData) => ({
                    ...prevData,
                    photo: null,
                }));
                alert('Invalid file type. Please upload a JPEG or PNG image.');
            }
        } else {
            setFormData((prevData) => ({
                ...prevData,
                photo: null,
            }));
        }
    };

    return (
        <div className="add-cause-form">
            <div className="close-button" onClick={handleClose}>
                <span className="close-cross">&#10005;</span>
            </div>
            <form>
                <div className='lable-update-auction'>
                    <h2 className='update-header'>Update: {formData?.name}</h2>
                </div>
                <label>
                    Auction name:
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                />

                <label>
                    Description:
                </label>
                <textarea
                    id="description"
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                />

                <input
                    type="file"
                    id="photo"
                    name="photo"
                    onChange={handleFileChange}
                    accept="image/*"
                />
                {submitted && !formData.photo &&
                    <p className='please-upload-photo-p'>
                        Please upload a photo.
                    </p>}

                <button type="submit" className='submit-button-cause' onClick={handleUpdateAuction}>Submit</button>
            </form>
        </div>
    );
}

export default UpdateAuctionForm;
