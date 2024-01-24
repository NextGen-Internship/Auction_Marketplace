import ApiResponseDTO from '../Interfaces/DTOs/ApiResponseDTO';
import GoogleLoginDTO from '../Interfaces/DTOs/GoogleLoginDTO';
import LoginDTO from '../Interfaces/DTOs/LoginDTO';
import RegisterDTO from '../Interfaces/DTOs/RegisterDTO';
import ApiService from './ApiService';

class UserService {
  private REGISTER_ENDPOINT = import.meta.env.VITE_REGISTER_ENDPOINT;
  private LOGIN_ENDPOINT = import.meta.env.VITE_LOGIN_ENDPOINT;
  private GOOGLE_LOGIN_ENDPOINT = import.meta.env.VITE_GOOGLE_LOGIN_ENDPOINT;
  private LOGOUT_ENDPOINT = import.meta.env.VITE_LOGOUT_ENDPOINT;
  private apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  async registerUser(data: RegisterDTO) : Promise<ApiResponseDTO> {
    const formData = new FormData();
    formData.append('firstName', data.firstName);
    formData.append('lastName', data.lastName);
    formData.append('email', data.email);
    formData.append('password', data.password);
    if (data.profilePicture) {
      formData.append('profilePicture', data.profilePicture);
    }

    return this.apiService.post<ApiResponseDTO>(this.REGISTER_ENDPOINT, formData);
  }

  async loginUser(data: LoginDTO): Promise<ApiResponseDTO> {
    return this.apiService.post<ApiResponseDTO>(this.LOGIN_ENDPOINT, data);
  }

  async loginUserWithGoogle(data: GoogleLoginDTO): Promise<ApiResponseDTO> {
    return this.apiService.post<ApiResponseDTO>(this.GOOGLE_LOGIN_ENDPOINT, data);
  }

  async logout(): Promise<ApiResponseDTO> {
    return this.apiService.get<ApiResponseDTO>(this.LOGOUT_ENDPOINT);
  }
}

export default UserService;