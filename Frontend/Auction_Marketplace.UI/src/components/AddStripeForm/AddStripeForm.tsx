import React, { useState } from 'react';
import './AddStripeForm.css';
import { StripeDTO } from '../../Interfaces/DTOs/StripeDTO';

const NameForm = () => {
    const [formData, setFormData] = useState<StripeDTO>({
      firstName: '',
      lastName: '',
      countryCode: '',
      city: '',
      street: '',
      postalCode: '',
      phone: '',
      email: '',
      dateOfBirth: '',
      bankAccountNumber: ''
    });
  
    const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      try {
        const response = await fetch('https://localhost:7141/api/CheckoutApi/create-stripe-account', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        // Handle the response as needed
        const result = await response.json();
        console.log(result);
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    return (
      <div className="formbold-main-wrapper">
        <div className="formbold-form-wrapper">
          <form onSubmit={handleSubmit}>
            <div className="formbold-form-title">
              <h2>Stripe Form</h2>
              <p></p>
            </div>
  
            <div className="formbold-input-flex">
              <div>
                <label htmlFor="firstname" className="formbold-form-label">
                  First name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstname"
                  className="formbold-form-input"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="lastname" className="formbold-form-label">
                  Last name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastname"
                  className="formbold-form-input"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div>
                <label htmlFor="email" className="formbold-form-label">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="formbold-form-input"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
  
            {/* Additional inputs for country, city, street, postal code, phone, and date of birth */}
            <div className="formbold-input-flex">
              <div>
                <label htmlFor="countryCode" className="formbold-form-label">
                  Country Code
                </label>
                <input
                  type="text"
                  name="countryCode"
                  id="countryCode"
                  className="formbold-form-input"
                  value={formData.countryCode}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="city" className="formbold-form-label">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  className="formbold-form-input"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
  
            <div className="formbold-input-flex">
              <div>
                <label htmlFor="street" className="formbold-form-label">
                  Street
                </label>
                <input
                  type="text"
                  name="street"
                  id="street"
                  className="formbold-form-input"
                  value={formData.street}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="postalCode" className="formbold-form-label">
                  Postal Code
                </label>
                <input
                  type="text"
                  name="postalCode"
                  id="postalCode"
                  className="formbold-form-input"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
  
            <div className="formbold-input-flex">
              <div>
                <label htmlFor="phone" className="formbold-form-label">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  className="formbold-form-input"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="dateOfBirth" className="formbold-form-label">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  id="dateOfBirth"
                  className="formbold-form-input"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

              <div>
                <label htmlFor="bankAccountNumber" className="formbold-form-label">
                Bank Account Number
                </label>
                <input
                  type="text"
                  name="bankAccountNumber"
                  id="bankAccountNumber"
                  className="formbold-form-input"
                  value={formData.bankAccountNumber}
                  onChange={handleInputChange}
                  required
                />
            </div>
  
            <button type="submit" className="formbold-btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };
  
  export default NameForm;