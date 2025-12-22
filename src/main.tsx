import "@/index.css";
import App from "@/App.tsx";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// 서버 상태 저장소 (store)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      /**
       * Cache Lifecycle (global, default)
       *
       * - fetching
       * - fresh -> (staleTime)
       * - stale -> (refetching)
       * - inactive -> (gcTime)
       * - deleted
       */

      // fresh -> stale
      staleTime: 0, // 개발시 0, 일반적으로 5000 ~ 30000 권장

      // inactive -> deleted (garbage collecting time)
      gcTime: 5 * 60 * 1000,

      // refetching options
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchInterval: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <App />
    </QueryClientProvider>
  </BrowserRouter>,
);
