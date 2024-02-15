import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import ApiService from '../../Services/ApiService';
import ApiResponseDTO from '../../Interfaces/DTOs/ApiResponseDTO';
import UpdateCauseDTO from '../../Interfaces/DTOs/UpdateCauseDTP';
import CauseService from '../../Services/CauseService';
import { useNavigate } from 'react-router-dom';

interface UpdateCauseFormProps {
    onClose: () => void;
    causeId: number;
    initialCauseData: UpdateCauseDTO | null;
}

interface FormData {
    name: string;
    description: string;
    amountNeeded: number
}

const UpdateCauseForm: React.FC<UpdateCauseFormProps> = ({ causeId, onClose, initialCauseData: initialCauseData }) => {

    const [formData, setFormData] = useState<FormData>({
        name: '',
        description: '',
        amountNeeded: 0
    });

    const navigate = useNavigate();
    const apiService = new ApiService();
    const causeService = new CauseService(apiService);

    useEffect(() => {
        if (initialCauseData) {
            setFormData({
                name: initialCauseData.name,
                description: initialCauseData.description,
                amountNeeded: initialCauseData.amountNeeded
            });
        }
    }, [initialCauseData]);


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

    const handleUpdateCause = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const updatedCause = await causeService.updateCause(causeId, formData);
            onClose()
            navigate('/causes');
        } catch (error) {
            console.error('Error updating cause:', error);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response: ApiResponseDTO = await causeService.updateCause(causeId, formData);

            if (response.succeed) {
                console.log('Cause updated successfully:', response.data);
                onClose();
            } else {
                console.error('Failed to update cause:', response.message);
            }
        } catch (error) {
            console.error('Error updating cause:', error);
            onClose();
            alert(`Error updating cause: `);
        }
    };

    return (
        <div className="add-cause-form">
            <div className="close-button" onClick={handleClose}>
                <span className="close-cross">&#10005;</span>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='lable-update-auction'>
                    <h2 className='create-cause-header' >Update: {formData?.name}</h2>
                </div>
                <label>
                    Cause name:
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
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                />

                <label>
                    Amount Needed
                </label>
                <textarea
                    id="amountNeeded"
                    name="amountNeeded"
                    placeholder="Amount needed"
                    value={formData.amountNeeded}
                    onChange={handleInputChange}
                    required
                />

                <button type="submit" className='submit-button-cause' onClick={handleUpdateCause}>Submit</button>
            </form>
        </div>
    );
}

export default UpdateCauseForm;
