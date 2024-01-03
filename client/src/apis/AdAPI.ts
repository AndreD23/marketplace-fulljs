import { ApiGateway } from "./ApiGateway";
import { IState } from "../types/state";
import { ICategory } from "../types/category";

interface StatesReturnData {
  states: IState[];
  error?: string;
}

interface CategoriesReturnData {
  categories: ICategory[];
  error?: string;
}

export const AdAPI = {
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
   * Retrieves the list of categories from the server.
   * @async
   * @returns {Promise<CategoriesReturnData>} - A promise that resolves to an object containing the list of categories and any error message.
   */
  getCategories: async (): Promise<CategoriesReturnData> => {
    try {
      return await ApiGateway.get("/ad/categories");
    } catch (error: any) {
      if (!error.message) {
        return { categories: [], error: "Erro de conexão com o servidor" };
      }

      return { categories: [], error: error.message };
    }
  },
};
