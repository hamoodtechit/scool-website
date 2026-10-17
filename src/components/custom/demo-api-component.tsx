"use client";

import React from "react";
import { useGetDemoItems, useCreateDemoItem } from "@/hooks/api/demo/use-demo";

/**
 * A Demo Component demonstrating the usage of hooks.
 * Notice how clean it is now! All error handling and toasts are inside the hook.
 */
export function DemoApiComponent() {
  const { data: items, isLoading, error: fetchError } = useGetDemoItems();
  const { mutate: createItem, isPending } = useCreateDemoItem();

  const handleCreate = () => {
    // We only pass the data. The hook handles the success/error toasts!
    createItem({ title: "New Item", description: "Created from client" });
  };

  if (isLoading) return <div>Loading items...</div>;
  
  if (fetchError) {
    return <div>Error loading data.</div>;
  }

  return (
    <div className="p-4 border rounded-md max-w-md space-y-4">
      <h2 className="text-xl font-bold">Demo Items</h2>

      <ul className="space-y-2">
        {items?.map((item) => (
          <li key={item.id} className="p-2 bg-muted rounded">
            <strong>{item.title}</strong>: {item.description}
          </li>
        ))}
      </ul>

      <button 
        onClick={handleCreate} 
        disabled={isPending}
        className="px-4 py-2 bg-primary text-primary-foreground rounded disabled:opacity-50"
      >
        {isPending ? "Creating..." : "Create Dummy Item"}
      </button>
    </div>
  );
}
