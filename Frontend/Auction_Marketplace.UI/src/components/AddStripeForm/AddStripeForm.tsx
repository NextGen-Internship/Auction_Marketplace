import { useState } from 'react';

const AddStripeForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [businessWebsite, setBusinessWebsite] = useState('');
  
    const handleFirstNameChange = (e : any) => {
      setFirstName(e.target.value);
    };
  
    const handleLastNameChange = (e : any) => {
      setLastName(e.target.value);
    };
  
    const handleCountryChange = (e : any) => {
      setCountry(e.target.value);
    };
  
    const handleCityChange = (e : any) => {
      setCity(e.target.value);
    };
  
    const handleStreetChange = (e : any) => {
      setStreet(e.target.value);
    };
  
    const handlePostalCodeChange = (e : any) => {
      setPostalCode(e.target.value);
    };
  
    const handleEmailChange = (e : any) => {
      setEmail(e.target.value);
    };
  
    const handlePhoneChange = (e : any) => {
      setPhone(e.target.value);
    };
  
    const handleDateOfBirthChange = (e : any) => {
      setDateOfBirth(e.target.value);
    };
  
    const handleBusinessWebsiteChange = (e : any) => {
      setBusinessWebsite(e.target.value);
    };
  
    const handleSubmit = (e : any) => {
      e.preventDefault();
      // You can save the data or perform any other actions here
      console.log('First Name:', firstName);
      console.log('Last Name:', lastName);
      console.log('Country:', country);
      console.log('City:', city);
      console.log('Street:', street);
      console.log('Postal Code:', postalCode);
      console.log('Email:', email);
      console.log('Phone:', phone);
      console.log('Date of Birth:', dateOfBirth);
      console.log('Business Website:', businessWebsite);
    };
  
    return (
     <div className="container">
      <form onSubmit={handleSubmit}>    
        <label>
          First Name:
          <input type="text" value={firstName} onChange={handleFirstNameChange} />
        </label>
        <br />
        <label>
          Last Name:
          <input type="text" value={lastName} onChange={handleLastNameChange} />
        </label>
        <br />
        <label>
          Country:
          <input type="text" value={country} onChange={handleCountryChange} />
        </label>
        <br />
        <label>
          City:
          <input type="text" value={city} onChange={handleCityChange} />
        </label>
        <br />
        <label>
          Street:
          <input type="text" value={street} onChange={handleStreetChange} />
        </label>
        <br />
        <label>
          Postal Code:
          <input type="text" value={postalCode} onChange={handlePostalCodeChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} />
        </label>
        <br />
        <label>
          Phone:
          <input type="tel" value={phone} onChange={handlePhoneChange} />
        </label>
        <br />
        <label>
          Date of Birth:
          <input type="date" value={dateOfBirth} onChange={handleDateOfBirthChange} />
        </label>
        <br />
        <label>
          Business Website:
          <input type="url" value={businessWebsite} onChange={handleBusinessWebsiteChange} />
        </label>
        <br />
        <button type="submit">Save</button>
      </form>
     </div>   
    );
  };

export default AddStripeForm;