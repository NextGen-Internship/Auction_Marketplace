export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

export const clearToken = (): void => {
  localStorage.removeItem('token');
};

export const isTokenExpired = (): boolean => {
  const token = getToken();
  
  if (token) {
    const decodedToken = parseToken(token);
    const currentTime = Math.floor(Date.now() / 1000); 
    return currentTime >= decodedToken.exp;
  }

  return true; 
};

const parseToken = (token: string): { exp: number } => {
  const payloadBase64 = token.split('.')[1];
  const decodedPayload = atob(payloadBase64);
  return JSON.parse(decodedPayload);
};