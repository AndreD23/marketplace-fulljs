import api from "./axios";
import Cookies from "js-cookie";

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
    const token = Cookies.get("token");
    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
    }

    try {
      const res = await api.post(url, params, config);

      return res.data;
    } catch (error: any) {
      if (error.response?.status >= 400 && error.response?.status < 500) {
        throw new Error(
          error.response?.data.message ||
            error.response?.data.error ||
            error.message,
        );
      }
      throw new Error("Erro interno, tente novamente mais tarde");
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
      if (error.response?.status >= 400 && error.response?.status < 500) {
        throw new Error(
          error.response?.data.message ||
            error.response?.data.error ||
            error.message,
        );
      }
      throw new Error("Erro interno, tente novamente mais tarde");
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
      if (error.response?.status >= 400 && error.response?.status < 500) {
        throw new Error(
          error.response?.data.message ||
            error.response?.data.error ||
            error.message,
        );
      }
      throw new Error("Erro interno, tente novamente mais tarde");
    }
  }
}
