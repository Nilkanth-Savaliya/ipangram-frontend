import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";

// // Create an Axios instance
// const api: AxiosInstance = axios.create({
//   baseURL: "https://api.example.com",
// });

// // Add an interceptor to set the authorization token
// api.interceptors.request.use(
//   (config) => {
//     // Get the authorization token from wherever you store it (e.g., local storage, state management)
//     const auth-token = "your_auth_token_here";

//     // Set the authorization token in the request header
//     config.headers.Authorization = `Bearer ${auth-token}`;

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default api;

export default class RestApi {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:3016/v1",
    });

    this.api.interceptors.request.use(
      (config) => {
        const authToken = Cookies.get("auth-token");
        if (authToken) {
          config.headers.Authorization = `Bearer ${authToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  public get<T>(url: string, params?: any, options?: any): Promise<T> {
    return this.api.get(url, { params, ...options });
  }

  public post<T>(url: string, data?: any, options?: any): Promise<T> {
    return this.api.post(url, data, options);
  }

  public put<T>(url: string, data?: any, options?: any): Promise<T> {
    return this.api.put(url, data, options);
  }

  public delete<T>(url: string, options?: any): Promise<T> {
    return this.api.delete(url, options);
  }

  public patch<T>(url: string, data?: any, options?: any): Promise<T> {
    return this.api.patch(url, data, options);
  }
}
