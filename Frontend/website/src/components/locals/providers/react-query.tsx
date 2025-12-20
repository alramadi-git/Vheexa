"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

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
