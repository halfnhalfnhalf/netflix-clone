"use client"

import { Provider } from "jotai"

interface ProviderProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProviderProps) => {
    return (
        <Provider>
            {children}
        </Provider>
    )
}