interface CauseDTO {
  userId: number,
  name: string;
  description: string;
  photo: File | null;
  amountNeeded: number;
  amountCurrent?: number; 
  isCompleted?: boolean; 
}

export default CauseDTO;