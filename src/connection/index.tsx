import { createWeb3Modal } from "@web3modal/wagmi/react";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import envVars from "../configs/envVars";
import { supportedChain } from "../configs";

// 0. Setup queryClient
const queryClient = new QueryClient();

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = envVars.walletConnectProjectId;

// 2. Create wagmiConfig
const metadata = {
    name: "Web3Modal",
    description: "Web3Modal Example",
    url: "https://web3modal.com", // origin must match your domain & subdomain
    icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const chains = [supportedChain] as const;
export const config = defaultWagmiConfig({
    chains, // required
    projectId, // required
    metadata, // required
    enableWalletConnect: true, // Optional - true by default
    enableInjected: true, // Optional - true by default
    enableEIP6963: false, // Optional - true by default
    enableCoinbase: false, // Optional - true by default
});

// 3. Create modal
createWeb3Modal({
    wagmiConfig: config,
    projectId,
    enableAnalytics: false, // Optional - defaults to your Cloud configuration
    themeMode: "light",
    themeVariables: {
        "--w3m-accent": "#5A1A6B",
        "--w3m-border-radius-master": "18",
    },
    featuredWalletIds: [],
    allWallets: "HIDE",
});

export function WagmiContextProvider({ children }: { children: ReactNode }) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </WagmiProvider>
    );
}
