import React, { useState, ChangeEvent, FormEvent } from 'react';
import './AddCauseForm.css';
import ApiService from '../../Services/ApiService';
import ApiResponseDTO from '../../Interfaces/DTOs/ApiResponseDTO';
import CauseService from '../../Services/CauseService';

interface AddCauseFormProps {
  onClose: () => void;
}

interface FormData {
  name: string;
  description: string;
  photo: File | null;
  amountNeeded: number;
}

const AddCauseForm: React.FC<AddCauseFormProps> = ({ onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    photo: null,
    amountNeeded: 0,
  });

  const allowedFileTypes = ['image/jpeg', 'image/png'];
  const apiService = new ApiService();
  const causesService = new CauseService(apiService);

  const handleClose = () => {
    onClose();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'amountNeeded' && !/^\d*$/.test(value)) {
      return;
    }
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
      const response: ApiResponseDTO = await causesService.createCause(formData);

      if (response.succeed) {
        console.log('Cause created successfully:', response.data);
        onClose();
      } else {
        console.error('Failed to create cause:', response.message);
      }
    } catch (error) {
      console.error('Error creating cause:', error);
      alert(`Error creating cause: `);
    }
  };

  return (
    <div className="add-cause-form">
      <div className="close-button" onClick={handleClose}>
        <span className="close-cross">&#10005;</span>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Cause Name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />

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

        <input
          type="number"
          id="amountNeeded"
          name="amountNeeded"
          placeholder="Money Needed"
          value={formData.amountNeeded}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddCauseForm;
