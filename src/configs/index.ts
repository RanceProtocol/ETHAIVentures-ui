import { arbitrum, sepolia } from "viem/chains";
import envVars from "./envVars";

export const maxAmount = "100000";
export const minGasFee = "0.01";

export const supportedChain = envVars.isTestnet ? sepolia : arbitrum;
