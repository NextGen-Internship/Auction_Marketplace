interface CauseDTO {
  name: string;
  description: string;
  photo: File | null;
  amountNeeded: number;
}

export default CauseDTO;