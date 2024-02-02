import CreateCauseDTO from '../Interfaces/DTOs/CreateCauseDTO'; 
import ApiResponseDTO from '../Interfaces/DTOs/ApiResponseDTO';
import ApiService from './ApiService';



class CauseService {
  private CREATE_CAUSE_ENDPOINT = import.meta.env.VITE_CREATE_CAUSE_ENDPOINT; 
  private GET_ALL_CAUSES_ENDPOINT = import.meta.env.VITE_GET_ALL_CAUSES_ENDPOINT; 
  private apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }


  async createCause(data: CreateCauseDTO): Promise<ApiResponseDTO> {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('amountNeeded', String(data.amountNeeded));

    if (data.photo) {
      formData.append('photo', data.photo);
    }

    return this.apiService.post<ApiResponseDTO>(this.CREATE_CAUSE_ENDPOINT, formData);
  }
 
  async getAllCauses(): Promise<ApiResponseDTO> {
    return this.apiService.get<ApiResponseDTO>(this.GET_ALL_CAUSES_ENDPOINT);
}
  
}

export default CauseService;
