import CauseDTO from '../Interfaces/DTOs/CauseDTO'; 
import ApiResponseDTO from '../Interfaces/DTOs/ApiResponseDTO';
import ApiService from './ApiService';

class CauseService {
  private CREATE_CAUSE_ENDPOINT = import.meta.env.VITE_CREATE_CAUSE_ENDPOINT; 
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

  
}

export default CauseService;
