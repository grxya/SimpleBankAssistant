import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { ApiRequest } from "../data/models/ApiRequest.model";

class ApiManager {
  static async apiRequest<T>(apiData: ApiRequest): Promise<T> {
    try {
      const url = ApiManager.buildUrlWithParams(apiData.Url, apiData.Params);

      const config: AxiosRequestConfig = {
        url,
        method: apiData.Method,
        headers: {
          "Content-Type": "application/json",
          ...apiData.Headers,
        },
        data: ApiManager.buildRequestData(
          apiData.Data,
          apiData.Headers?.["Content-Type"]
        ),
        withCredentials: apiData.WithCredentials ?? false,
      };

      const response: AxiosResponse<T> = await axios(config);
      return response.data;
    } catch (error: any) {
      let errorMessage = "Unknown error";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      return Promise.reject(errorMessage);
    }
  }

  private static buildUrlWithParams(
    url: string,
    params?: Record<string, any>
  ): string {
    if (!params) return url;
    const queryString = new URLSearchParams(params).toString();
    return queryString ? `${url}?${queryString}` : url;
  }

  private static buildRequestData(
    data: any,
    contentType: string | undefined
  ): any {
    if (contentType === "application/x-www-form-urlencoded") {
      return new URLSearchParams(data).toString();
    }
    return data;
  }
}

export default ApiManager;
