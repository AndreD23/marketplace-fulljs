import api from "./axios";

interface LoginData {
  token: string;
  error?: string;
}

export const AuthAPI = {
  /**
   * Logs in the user with the provided email and password.
   *
   * @param {string} email - The email of the user.
   * @param {string} password - The password of the user.
   * @returns {Promise<LoginData>} - A promise that resolves to an object containing the login token and error message.
   */
  login: async (email: string, password: string): Promise<LoginData> => {
    try {
      return await api.post("/auth/login", { email, password });
    } catch (error: any) {
      console.error(error.response);

      if (!error.response) {
        return { token: "", error: "Erro de conexão com o servidor" };
      }

      return { token: "", error: error.response?.data.message };
    }
  },
};
