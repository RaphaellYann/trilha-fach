"use client";

import { SessionProvider } from "next-auth/react";

// Mudamos de "Providers" para "SessionProviderWrapper"
export function SessionProviderWrapper({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}