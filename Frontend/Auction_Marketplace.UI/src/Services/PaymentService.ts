
import ApiResponseDTO from '../Interfaces/DTOs/ApiResponseDTO';
import ApiService from './ApiService';

class PaymentService {
  private GET_PAYMENTS_BY_ID_ENDPOINT = import.meta.env.VITE_PAYMENTS_BY_ID_ENDPOINT;
  private apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  async getPaymentById(causeId: number): Promise<ApiResponseDTO> {
    return this.apiService.get<ApiResponseDTO>(`${this.GET_PAYMENTS_BY_ID_ENDPOINT}${causeId}`);
  }

}

export default PaymentService;
