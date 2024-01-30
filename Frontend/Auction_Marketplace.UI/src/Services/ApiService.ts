import axios, { AxiosRequestConfig } from 'axios';

class ApiService {
    private baseUrl = import.meta.env.VITE_BASE_URL;

    private async handleResponse(response: any) {
        console.log(response);
        if (!response.data.succeed) {
            throw new Error(response.data.errorMessage);
        }
        return response.data;
    }

    private async request<T>(config: AxiosRequestConfig): Promise<T> {
        try {
            const response = await axios(config);
            return this.handleResponse(response);
        } catch (error: any) {
            console.error('API request error:', error);
            throw new Error(error.response?.data.errorMessage || 'An error occurred');
        }
    }

    async get<T>(endpoint: string): Promise<T> {
        return this.request<T>({
            method: 'get',
            url: `${this.baseUrl}/${endpoint}`,
        });
    }

    async post<T>(endpoint: string, data: any): Promise<T> {
        console.log(data);
        return this.request<T>({
            method: 'post',
            url: `${this.baseUrl}/${endpoint}`,
            data,
        });
    }

    async put<T>(endpoint: string, data: any): Promise<T> {
        return this.request<T>({
            method: 'put',
            url: `${this.baseUrl}/${endpoint}`,
            data,
        });
    }

    async delete<T>(endpoint: string): Promise<T> {
        return this.request<T>({
            method: 'delete',
            url: `${this.baseUrl}/${endpoint}`,
        });
    }
}

export default ApiService;