import ApiService from './ApiService';
import ApiResponseDTO from '../Interfaces/DTOs/ApiResponseDTO';

class BidService {
    private PLACE_BID_ENDPOINT = import.meta.env.VITE_PLACE_BID_ENDPOINT;
    private apiService: ApiService;

    constructor(apiService: ApiService) {
        this.apiService = apiService;
    }

    async placeBid(bidAmount: number, auctionId: number): Promise<ApiResponseDTO> {
        return this.apiService.post<ApiResponseDTO>(`${this.PLACE_BID_ENDPOINT}/${auctionId}`, {bidAmount});
    }

}

export default BidService;