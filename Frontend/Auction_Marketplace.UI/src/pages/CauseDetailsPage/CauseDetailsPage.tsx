import React from 'react';
import { Link, useParams } from 'react-router-dom'; 
import CauseDTO from '../../Interfaces/DTOs/CauseDTO'; 

interface CauseDetailsPageProps {
  cause: CauseDTO[]; 
}

const CauseDetailsPage: React.FC<CauseDetailsPageProps> = ({ cause }) => {
  const { causeId } = useParams<{ causeId: string }>();
  const causeIdNumber = parseInt(causeId || '0', 10);
  const currentCause = causeIdNumber ? cause.find(c => c.causeId === causeIdNumber) : null;
  if (!currentCause) {
    return <div>Cause not found</div>;
  }

  return (
    <div>
      <h2>{currentCause.name}</h2>
      <img src={currentCause.photo} alt={currentCause.name} />
      <p>Description: {currentCause.description}</p>
      <p>Amount Needed: ${currentCause.amountNeeded}</p>
      <p>Current Amount: ${currentCause.amountCurrent}</p>
      
      <Link to="/causes">Back to Causes</Link>
    </div>
  );
};

export default CauseDetailsPage;
