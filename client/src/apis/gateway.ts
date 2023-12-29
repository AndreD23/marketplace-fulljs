import api from "./axios";

export class ApiGateway {
  static async get<R>(
    url: string,
    config: Record<string, any> = {},
  ): Promise<R> {
    try {
      const res = await api.get(url, config);

      return res.data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        throw new Error(error.response?.data.message || error.message);
      }
      throw new Error(error);
    }
  }
  static async post<T, R>(
    url: string,
    params: T,
    config: Record<string, any> = {},
  ): Promise<R> {
    try {
      const res = await api.post(url, params, config);

      return res.data;
    } catch (error: any) {
      if (error.response?.status === 400) {
        throw new Error(error.response?.data.message || error.message);
      }
      if (error.response?.status === 401) {
        throw new Error(error.response?.data.message || error.message);
      }
      if (error.response?.status === 404) {
        throw new Error(error.response?.data.message || error.message);
      }
      throw new Error(error);
    }
  }
  static async put<T, R>(
    url: string,
    params: T,
    config: Record<string, any> = {},
  ): Promise<R> {
    try {
      const res = await api.put(url, params, config);

      return res.data;
    } catch (error: any) {
      if (error.response?.status === 400) {
        throw new Error(error.response?.data.message || error.message);
      }
      if (error.response?.status === 401) {
        throw new Error(error.response?.data.message || error.message);
      }
      if (error.response?.status === 404) {
        throw new Error(error.response?.data.message || error.message);
      }
      throw new Error(error);
    }
  }
  static async delete<R>(
    url: string,
    config: Record<string, any> = {},
  ): Promise<R> {
    try {
      const res = await api.delete(url, config);

      return res.data;
    } catch (error: any) {
      if (error.response?.status === 400) {
        throw new Error(error.response?.data.message || error.message);
      }
      if (error.response?.status === 401) {
        throw new Error(error.response?.data.message || error.message);
      }
      if (error.response?.status === 404) {
        throw new Error(error.response?.data.message || error.message);
      }
      throw new Error(error);
    }
  }
}
