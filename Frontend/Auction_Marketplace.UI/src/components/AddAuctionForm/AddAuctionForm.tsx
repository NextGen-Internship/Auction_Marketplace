import React, { useState, ChangeEvent, FormEvent } from 'react';
import ApiService from "../../Services/ApiService";
import '../AddCauseForm/AddCauseForm.css';
import AuctionService from "../../Services/AuctionService";
import ApiResponseDTO from "../../Interfaces/DTOs/ApiResponseDTO";

interface AddAuctionFormProps {
  onClose: () => void;
}

interface FormData {
  name: string;
  description: string;
  isCompleted: boolean;
}

const AddAuctionForm: React.FC<AddAuctionFormProps> = ({ onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    isCompleted: false,
  });

  const apiService = new ApiService();
  const auctionService = new AuctionService(apiService);

  const handleClose = () => {
    onClose();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response: ApiResponseDTO = await auctionService.createAuction(formData);

      if (response.succeed) {
        console.log('Auction created successfully:', response.data);
        onClose();
      } else {
        console.error('Failed to create auction:', response.message);
      }
    } catch (error) {
      console.error('Error creating auction:', error);
      alert(`Error creating auction: `);
    }
  };

  return (
    <div className="add-cause-form">
      <div className="close-button" onClick={handleClose}>
        <span className="close-cross">&#10005;</span>
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          Auction:
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

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddAuctionForm;
