import { ApiGateway } from "./ApiGateway";
import { IState } from "../types/state";

interface LoginReturnData {
  token: string;
  error?: string;
}

interface StatesReturnData {
  states: IState[];
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

  /**
   * Retrieves the list of states from the server.
   *
   * @async
   * @returns {Promise<StatesReturnData>} A promise that resolves to an object containing the list of states and any error messages.
   */
  getStates: async (): Promise<StatesReturnData> => {
    try {
      return await ApiGateway.get("/states");
    } catch (error: any) {
      if (!error.message) {
        return { states: [], error: "Erro de conexão com o servidor" };
      }

      return { states: [], error: error.message };
    }
  },

  /**
   * Registers a user with the given details.
   *
   * @param {string} name - The name of the user.
   * @param {string} email - The email of the user.
   * @param {string} password - The password of the user.
   * @param {string} idState - The state ID of the user.
   *
   * @returns {Promise<LoginReturnData>} - The login return data, containing a token and error message (if any).
   */
  register: async (
    name: string,
    email: string,
    password: string,
    idState: string,
  ): Promise<LoginReturnData> => {
    try {
      return await ApiGateway.post("/auth/register", {
        email,
        password,
        name,
        idState,
      });
    } catch (error: any) {
      if (!error.message) {
        return { token: "", error: "Erro de conexão com o servidor" };
      }

      return { token: "", error: error.message };
    }
  },
};
