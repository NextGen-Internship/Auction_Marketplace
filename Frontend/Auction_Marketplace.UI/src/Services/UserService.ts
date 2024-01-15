import ApiService from './ApiService';

class UserService {
  private apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  async registerUser(firstName: string, lastName: string, email: string, password: string, profilePicture?: File): Promise<any> {
    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('password', password);

    if (profilePicture) {
      formData.append('profilePicture', profilePicture);
    }

    return this.apiService.post<any>('Authentication/Register', formData);
  }

  async loginUser(username: string, password: string): Promise<any> {
    const data = {
      username,
      password,
    };
    return this.apiService.post<any>('Authentication/Login', data);
  }

  // Add other user-related methods as needed
}

export default UserService;
