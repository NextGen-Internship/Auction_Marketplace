import React, { useEffect, useState } from 'react';
import { useParams, Link} from 'react-router-dom';
import CauseService from '../../Services/CauseService';
import ApiService from '../../Services/ApiService';
import CauseDTO from '../../Interfaces/DTOs/CauseDTO';
import './CauseDetailsPage.css';
import DonationForm from '../../Components/DonationForm/DonationForm.tsx'; 

declare const navigate: (to: string) => void;

const CauseDetailsPage: React.FC = () => {
  const { causeId } = useParams<{ causeId: string | undefined }>();
  const [cause, setCause] = useState<CauseDTO | null>(null);
  const [showDonationForm, setShowDonationForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiService = new ApiService();
        const causeService = new CauseService(apiService);
        const causeResponse = await causeService.getCauseById(Number(causeId));
        console.log('Cause Response:', causeResponse);

        const fetchedCause: CauseDTO = causeResponse.data;
        setCause(fetchedCause);
      } catch (error) {
        console.error('Error fetching cause details:', error);
      }
    };

    fetchData();
  }, [causeId]);

  if (!cause) {
    return <p>Loading...</p>;
  }

  function getLineColor(amountCurrent: number, amountNeeded: number): string {
  const progressRatio = amountCurrent / amountNeeded;

     if (progressRatio <= 0.25) {
       return 'short-line red-line';
     } else if (progressRatio <= 0.5) {
       return 'half-line yellow-line';
     } else {
       return 'full-line green-line';
     }
  }

   const handleDonateClick = () => {
    setShowDonationForm(true);
  };

  const handleFormClose = () => {
    setShowDonationForm(false);
  };

  return (
    <div className="cause-details-container">
      {!showDonationForm && (
        <>
          <Link to={`/causes`} className="back-causes-button">
            Back to Causes
          </Link>
          <h2>{cause.name}</h2>
          <p>{cause.description}</p>
          <img src={cause.photo} alt={cause.name} className="cause-details-image" />
          <div className="amount-details">
            <div className="amount-line">
              <div className="line full-line"></div>
              <span className="money-amount">${cause.amountNeeded}</span>
            </div>
            <div className="amount-line">
              <div className={`line ${getLineColor(cause.amountCurrent, cause.amountNeeded)}`}></div>
              <span className="money-amount">${cause.amountCurrent}</span>
            </div>
          </div>
          <button className="donate-button" onClick={handleDonateClick}>Donate</button>
        </>
      )}
      {showDonationForm && <DonationForm onClose={handleFormClose} />}
    </div>
  );
};

export default CauseDetailsPage;
