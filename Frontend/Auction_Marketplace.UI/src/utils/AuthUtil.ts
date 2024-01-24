import jwt from 'jsonwebtoken-promisified';

interface DecodedUserToken {
  user: {
    firstName: string;
    lastName: string;
    username: string;
    phoneNumber: string;
  };
}

export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

export const clearToken = (): void => {
  localStorage.removeItem('token');
};

export const getUserFromCredentials = () => {
  const token = localStorage.getItem('token'); 

  if (token) {
    try {
      const decodedToken = jwt.decode(token) as DecodedUserToken;
      const { user } = decodedToken;
      return user;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  return null;
};