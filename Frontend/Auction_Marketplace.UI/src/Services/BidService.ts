import ApiService from './ApiService';
import ApiResponseDTO from '../Interfaces/DTOs/ApiResponseDTO';
import BidDTO from '../Interfaces/DTOs/BidDTO';

class BidService {
    private PLACE_BID_ENDPOINT = import.meta.env.VITE_PLACE_BID_ENDPOINT;
    private apiService: ApiService;

    constructor(apiService: ApiService) {
        this.apiService = apiService;
    }

    async placeBid(data: BidDTO, auctionId: number): Promise<ApiResponseDTO> {
        const formData = new FormData();
        formData.append('amount', String(data.amount));
        return this.apiService.post<any>(`${this.PLACE_BID_ENDPOINT}/${auctionId}`, formData);
    }

}

export default BidService;