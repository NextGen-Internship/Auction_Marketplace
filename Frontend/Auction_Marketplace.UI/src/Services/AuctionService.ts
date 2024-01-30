import ApiService from './ApiService';
import ApiResponseDTO from '../Interfaces/DTOs/ApiResponseDTO';

class AuctionService {
    private GET_AUCTIONS_ENDPOINT = import.meta.env.VITE_GET_AUCTIONS;
    private apiService: ApiService;

    constructor(apiService: ApiService) {
        this.apiService = apiService;
    }

    async fetchAuctions(): Promise<ApiResponseDTO> {
        return this.apiService.get<ApiResponseDTO>(this.GET_AUCTIONS_ENDPOINT);
    }
}

export default AuctionService;