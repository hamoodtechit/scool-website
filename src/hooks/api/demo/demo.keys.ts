/** 
 * Query Keys for Demo Feature
 * 
 * Keeping keys in a separate file (e.g. `demo.keys.ts`) per feature folder
 * is the standard best practice. It prevents circular dependencies and keeps 
 * the hook files clean!
 */
export const demoKeys = {
  all: ["demo-items"] as const,
  detail: (id: string) => ["demo-items", id] as const,
};
