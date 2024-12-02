export const BASE_URL = process.env.REACT_APP_API_PROD
export const createApi = (url: string) => `${BASE_URL}/api/v1/${url}`;