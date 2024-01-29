interface ApiResponseDTO<T = any> {
    succeed: boolean;
    message?: string;
    data?: T;
}

export default ApiResponseDTO;