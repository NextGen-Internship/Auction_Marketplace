import ApiService from './ApiService';

class UserService {
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

    return this.apiService.post<any>('api/Authentication/Register', formData);
  }

  async loginUser(email: string, password: string): Promise<any> {
    const data = {
      email,
      password,
    };
    return this.apiService.post<any>('api/Authentication/Login', data);
  }

  async loginUserWithGoogle(googleToken: string): Promise<any> {
    const data = {
      googleToken,
    };
    return this.apiService.post<any>('api/Authentication/google-login', data);
  }
}

export default UserService;
