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

  async registerUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    profilePicture?: File
  ): Promise<any> {
    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('password', password);
    if (profilePicture) {
      formData.append('profilePicture', profilePicture);
    }

    return this.apiService.post<any>(this.REGISTER_ENDPOINT, formData);
  }

  async loginUser(email: string, password: string): Promise<any> {
    const data = {
      email,
      password,
    };
    return this.apiService.post<any>(this.LOGIN_ENDPOINT, data);
  }

  async loginUserWithGoogle(googleToken: string): Promise<any> {
    const data = {
      googleToken,
    };
    return this.apiService.post<any>(this.GOOGLE_LOGIN_ENDPOINT, data);
  }

  async logout(): Promise<any> {
    return this.apiService.get<any>(this.LOGOUT_ENDPOINT);
  }
}

export default UserService;
