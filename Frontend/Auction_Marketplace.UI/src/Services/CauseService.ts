import CauseDTO from '../Interfaces/DTOs/CauseDTO'; 
import ApiResponseDTO from '../Interfaces/DTOs/ApiResponseDTO';
import ApiService from './ApiService';

interface Cause {
  causeId: number;
  userId: number;
  user: any; // Replace 'any' with the actual type of 'user'
  name: string;
  description: string;
  photo: string;
  amountNeeded: number;
  amountCurrent: number;
  isCompleted: boolean;
  donations: any[]; // Replace 'any' with the actual type of 'donations'
  createdAt: string;
  updatedAt: string;
  deletedOn: string | null;
}

class CauseService {
  private CREATE_CAUSE_ENDPOINT = import.meta.env.VITE_CREATE_CAUSE_ENDPOINT; 
  private GET_ALL_CAUSES_ENDPOINT = import.meta.env.VITE_GET_ALL_CAUSES_ENDPOINT; 
  private apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }


  async createCause(data: CauseDTO): Promise<ApiResponseDTO> {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('amountNeeded', String(data.amountNeeded));

    if (data.photo) {
      formData.append('photo', data.photo);
    }

    return this.apiService.post<ApiResponseDTO>(this.CREATE_CAUSE_ENDPOINT, formData);
  }
 
  async getAllCauses(): Promise<ApiResponseDTO<Cause[]>> {
    return this.apiService.get<ApiResponseDTO<Cause[]>>(this.GET_ALL_CAUSES_ENDPOINT);
}
  
}

export default CauseService;
