import { ApiGateway } from "./ApiGateway";
import { IState } from "../types/state";
import { ICategory } from "../types/category";
import { IAd } from "../types/ad";

interface StatesReturnData {
  states: IState[];
  error?: string;
}

interface CategoriesReturnData {
  categories: ICategory[];
  error?: string;
}

interface RecentAdsReturnData {
  ads: IAd[];
  total?: number;
  error?: string;
}

interface GetRecentAdsResultData {
  total: number;
  data: IAd[];
  error?: string;
}

interface GetAdsOptions {
  sort?: string;
  limit?: number;
  offset?: number;
  q?: string;
  cat?: string;
  state?: string;
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

  /**
   * Retrieves a list of recent ads based on the specified options.
   *
   * @param {GetAdsOptions} options - The options to customize the query. Optional.
   * @returns {Promise<RecentAdsReturnData>} - A promise that resolves to an object containing the ads and total count.
   */
  getAds: async (options?: GetAdsOptions): Promise<RecentAdsReturnData> => {
    try {
      const response = await ApiGateway.get<GetRecentAdsResultData>(
        "/ad/list",
        {
          params: options,
        },
      );
      return {
        ads: response.data,
        total: response.total,
      };
    } catch (error: any) {
      if (!error.message) {
        return { ads: [], error: "Erro de conexão com o servidor" };
      }

      return { ads: [], error: error.message };
    }
  },
};
