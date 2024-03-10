import { mainnet, sepolia } from "viem/chains";
import envVars from "./envVars";

export const maxAmount = "50000";
export const minGasFee = "0.01";
export const supportedChain = envVars.isTestnet ? sepolia : mainnet;
