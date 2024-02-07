import ApiService from './ApiService';
import ApiResponseDTO from '../Interfaces/DTOs/ApiResponseDTO';
import CreateAuctionDTO from '../Interfaces/DTOs/CreateAuctionDTO';
import UpdateAuctionDTO from '../Interfaces/DTOs/UpdateAuctionDTO';

class AuctionService {
    private GET_AUCTIONS_ENDPOINT = import.meta.env.VITE_GET_AUCTIONS;
    private CREATE_AUCTION_ENDPOINT = import.meta.env.VITE_CREATE_AUCTION_ENDPOINT;
    private UPDATE_AUCTION_ENDPOINT = import.meta.env.VITE_UPDATE_AUCTION_ENDPOINT;
    private GET_AUCTION_BY_ID_ENDPOINT = import.meta.env.VITE_GET_AUCTION_BY_ID_ENDPOINT;
    private apiService: ApiService;

    constructor(apiService: ApiService) {
        this.apiService = apiService;
    }

    async fetchAuctions(): Promise<ApiResponseDTO> {
        return this.apiService.get<ApiResponseDTO>(this.GET_AUCTIONS_ENDPOINT);
    }

    async createAuction(data: CreateAuctionDTO): Promise<ApiResponseDTO> {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('existingDays', String(data.existingDays));
        formData.append('isCompleted', String(data.isCompleted));
        if (data.photo) {
            formData.append('photo', data.photo);
        }

        return this.apiService.post<ApiResponseDTO>(this.CREATE_AUCTION_ENDPOINT, formData);
    }

    async updateAuction(data: UpdateAuctionDTO): Promise<ApiResponseDTO> {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('isCompleted', String(data.isCompleted));
        if (data.photo) {
            formData.append('photo', data.photo);
        }

        return this.apiService.put<ApiResponseDTO>(this.UPDATE_AUCTION_ENDPOINT, formData);
    }
    
    async getAuctionById(auctioId: number): Promise<ApiResponseDTO> {
        const endpoint = `${this.GET_AUCTION_BY_ID_ENDPOINT}/${auctioId}`;
        return this.apiService.get<ApiResponseDTO>(endpoint);
    }
}

export default AuctionService;