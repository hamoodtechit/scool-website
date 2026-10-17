import api from "@/lib/api";
import type { ApiResponse } from "@/types/api.types";

export interface DemoItem {
  id: string;
  title: string;
  description: string;
}

/**
 * Service layer — strictly handles the raw Axios API transport.
 * Keeps React out of the API logic.
 */
export const demoService = {
  /** Fetch a list of items */
  getItems: () => 
    api.get<ApiResponse<DemoItem[]>>("/demo/items"),

  /** Fetch a single item by ID */
  getItemById: (id: string) => 
    api.get<ApiResponse<DemoItem>>(`/demo/items/${id}`),

  /** Create a new item */
  createItem: (data: Omit<DemoItem, "id">) => 
    api.post<ApiResponse<DemoItem>>("/demo/items", data),
};
