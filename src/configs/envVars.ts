import { Address } from "viem";

const ensureDefined = (key: string, value?: string) => {
    if (typeof value === "undefined") {
        throw new Error(`Missing env variable for: ${key}`);
    }
    return value;
};

const walletConnectProjectId = ensureDefined(
    "VITE_WALLET_CONNECT_PROJECT_ID",
    import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID
);

const contractAddress = ensureDefined(
    "VITE_WALLET_CONTRACT_ADDRESS",
    import.meta.env.VITE_WALLET_CONTRACT_ADDRESS
) as Address;

const isTestnet =
    ensureDefined(
        "VITE_WALLET_IS_TEST_ENVIRONMENT",
        import.meta.env.VITE_WALLET_IS_TEST_ENVIRONMENT
    ) === "true"
        ? true
        : false;

export default { walletConnectProjectId, contractAddress, isTestnet };
