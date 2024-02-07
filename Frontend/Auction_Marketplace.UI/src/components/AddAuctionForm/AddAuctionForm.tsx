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
  photo: File | null;
  startPrice: number;
  existingDays: number;
}

const AddAuctionForm: React.FC<AddAuctionFormProps> = ({ onClose }) => {

  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    isCompleted: false,
    photo: null,
    startPrice: 0,
    existingDays: 0,
  });

  const allowedFileTypes = ['image/jpeg', 'image/png'];
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
      onClose();
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

        <input
          type="file"
          id="photo"
          name="photo"
          onChange={handleFileChange}
          accept="image/*"
        />

        <label>
           Start Price:
        </label>
        <div className="input-with-symbol">
         <span className="symbol">$</span>
         <input
            type="number"
            id="startPrice"
            name="startPrice"
            placeholder="Start Price"
            value={formData.startPrice}
            onChange={handleInputChange}
            required
          />
        </div>
      
        <label>
          Existing Days:
        </label>
        <input
          type="number"
          id="existingDays"
          name="existingDays"
          placeholder="Existing Days"
          value={formData.existingDays}
          onChange={handleInputChange}
          required
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddAuctionForm;
