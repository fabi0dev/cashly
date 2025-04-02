export const SystemConfig = {
  title: "Cashly",
  api: {
    baseURL:
      import.meta.env.MODE === "development"
        ? "/api"
        : import.meta.env.VITE_BASE_URL,
    timeout: 60000,
  },
  list: {
    defaultLimit: 10,
    itemsPerPage: [10, 20, 50, 100],
  },
};
