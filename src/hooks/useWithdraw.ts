import { useCallback } from "react";
import { useWriteContract } from "wagmi";
import envVars from "../configs/envVars";
import { parseAbi, parseEther } from "viem";

const useWithdraw = (value: string) => {
    const {
        data: hash,
        error,
        isPending,
        writeContractAsync,
    } = useWriteContract({});

    const withdraw = useCallback(async () => {
        return writeContractAsync({
            address: envVars.contractAddress,
            abi: parseAbi(["function deposit() payable"]),
            functionName: "deposit",
            value: parseEther(value),
        });
    }, [value, writeContractAsync]);

    return {
        hash,
        error,
        isPending,
        withdraw,
    };
};

export default useWithdraw;
