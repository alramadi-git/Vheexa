"use client";

import { eDuration } from "@/enums/duration";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * eDuration.minute * 15,
      gcTime: 1000 * eDuration.minute * 15,
    },
  },
});

type tReactQueryProviderProps = {
  children: React.ReactNode;
};
export default function ReactQueryProvider({
  children,
}: tReactQueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
