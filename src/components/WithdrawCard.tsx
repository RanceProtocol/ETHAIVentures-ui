import { Box, Card, Flex, Text } from "@radix-ui/themes";
import ConfirmationModal from "./ConfirmationModal";
import { ChangeEvent, useCallback, useState } from "react";
import { escapeRegExp, inputRegex, isSupportedChain } from "../utils";
import { maxAmount, minGasFee, supportedChain } from "../configs";
import useWithdraw from "../hooks/useWithdraw";
import { BaseError, useAccount } from "wagmi";
import { toast } from "react-toastify";
import { waitForTransactionReceipt } from "wagmi/actions";
import { config } from "../connection";

const WithdrawCard = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [usdtAmountInput, setUsdtAmountInput] = useState("");
    const [gasFeeAmountInput, setGasFeeAmountInput] = useState("");
    const [isPending, setIsPending] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);
    const { isConnected, chainId } = useAccount();

    const handleUsdtAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value: nextValue } = event.target;
        if (
            nextValue === "" ||
            (inputRegex.test(escapeRegExp(nextValue)) &&
                Number(nextValue) <= Number(maxAmount))
        )
            setUsdtAmountInput(event.target.value);
    };

    const handleGasFeeAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value: nextValue } = event.target;
        if (nextValue === "" || inputRegex.test(escapeRegExp(nextValue)))
            setGasFeeAmountInput(event.target.value);
    };
    const handleMaxClick = () => setUsdtAmountInput(maxAmount);

    const { withdraw, error } = useWithdraw(gasFeeAmountInput);

    const confirmWithdrawal = useCallback(async () => {
        if (!isConnected)
            return toast.error(
                "You are disconnected. You should connect your wallet"
            );
        if (!isSupportedChain(chainId))
            return toast.error(
                `You are connected to a wrong network, You should connect to ${supportedChain.name}`
            );
        if (Number(gasFeeAmountInput) < Number(minGasFee))
            return toast.error(`Minimum required fas fee is  ${minGasFee}`);
        try {
            setIsPending(true);
            const hash = await withdraw();
            setIsPending(false);
            setIsConfirming(true);
            const receipt = await waitForTransactionReceipt(config, { hash });

            if (receipt?.status) {
                toast.success("Withdrawal confirmed!!");
                setGasFeeAmountInput("");
                setUsdtAmountInput("");
            } else {
                toast.error("Withdrawal failed!!");
            }
        } catch (err: any) {
            console.log(err);

            toast.error(
                (error as BaseError).shortMessage ||
                    err?.message ||
                    "Something went wrong"
            );
        } finally {
            setIsConfirming(false);
        }
    }, [chainId, error, gasFeeAmountInput, isConnected, withdraw]);

    return (
        <>
            <Card style={{ width: 650, maxWidth: "100%" }} variant="ghost">
                <Box mb="6" className="pb-4 border-b-2">
                    <Text className="font-bold text-xl">Withdraw</Text>
                </Box>
                <Box>
                    <Box className="w-full">
                        <Flex justify="between">
                            <Text>Amount</Text>
                            <Text className="text-gray-400">
                                Allocated Balance: 50,000 USDT
                            </Text>
                        </Flex>
                        <Box my="2" className="relative w-full h-10">
                            <span className="absolute translate-x-2 translate-y-3 text-gray-500">
                                $
                            </span>
                            <input
                                className="w-full h-full border-1 border-solid border border-gray-300 outline-purple-400 rounded py-6 px-5 font-semibold"
                                type="text"
                                inputMode="decimal"
                                autoComplete="off"
                                autoCorrect="off"
                                pattern="^[0-9]*[.,]?[0-9]*$"
                                placeholder="0"
                                minLength={1}
                                maxLength={79}
                                spellCheck="false"
                                value={usdtAmountInput}
                                onChange={handleUsdtAmountChange}
                            />
                            <button
                                className="font-semibold absolute right-0 -translate-x-2 translate-y-3 text-sm text-[#5A1A6B]"
                                onClick={handleMaxClick}
                            >
                                MAX
                            </button>
                        </Box>
                        <Flex mt="6" justify="between">
                            <Text>Estimate gas fee</Text>
                            <Text>0.000134ETH</Text>
                        </Flex>
                        <Box mt="9">
                            <button
                                onClick={() => setModalOpen(true)}
                                disabled={Boolean(
                                    Number(usdtAmountInput) === 0
                                )}
                                className="w-full text-white bg-[#5A1A6B] p-3 rounded-md disabled:bg-slate-300"
                            >
                                {Number(usdtAmountInput) === 0
                                    ? "Enter Amount of USDT to withdraw"
                                    : "Confirm withdrawal"}
                            </button>
                        </Box>
                    </Box>
                </Box>
            </Card>
            <ConfirmationModal
                open={modalOpen}
                handleInputChange={handleGasFeeAmountChange}
                value={gasFeeAmountInput}
                confirmWithdrawal={confirmWithdrawal}
                handleClose={() => setModalOpen(false)}
                isConfirming={isConfirming}
                isPending={isPending}
            />
        </>
    );
};

export default WithdrawCard;
