import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { demoService, type DemoItem } from "@/services/demo.service";
import { extractErrorMessage } from "@/utils/error";
import { demoKeys } from "./demo.keys";

/**
 * Hook to fetch all items.
 * Uses standard React Query for caching, automatic background refreshing, etc.
 */
export function useGetDemoItems() {
  return useQuery({
    queryKey: demoKeys.all,
    queryFn: async () => {
      const response = await demoService.getItems();
      return response.data.data; // Return the inner T payload from ApiResponse<T>
    },
  });
}

/**
 * Hook to create an item.
 * Demonstrates global error handling, toast notifications, and cache invalidation.
 */
export function useCreateDemoItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<DemoItem, "id">) => demoService.createItem(data),
    onSuccess: () => {
      // 1. Invalidate the cache for the 'all' key so the list automatically refetches
      queryClient.invalidateQueries({ queryKey: demoKeys.all });
      // 2. Show a global success toast
      toast.success("Item created successfully!");
    },
    onError: (error) => {
      // 3. Extract the clean error and show a global error toast
      toast.error(extractErrorMessage(error));
    },
  });
}
