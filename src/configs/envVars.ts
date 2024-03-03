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

export default { walletConnectProjectId };
