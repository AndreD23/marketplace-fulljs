import { ApiGateway } from "./ApiGateway";

interface LoginReturnData {
  token: string;
  error?: string;
}

export const AuthAPI = {
  /**
   * Logs in the user with the provided email and password.
   *
   * @param {string} email - The email of the user.
   * @param {string} password - The password of the user.
   * @returns {Promise<LoginReturnData>} - A promise that resolves to an object containing the login token and error message.
   */
  login: async (email: string, password: string): Promise<LoginReturnData> => {
    try {
      return await ApiGateway.post("/auth/login", { email, password });
    } catch (error: any) {
      if (!error.message) {
        return { token: "", error: "Erro de conexão com o servidor" };
      }

      return { token: "", error: error.message };
    }
  },
};
