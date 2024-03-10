import { Box, Card, Flex, Text } from "@radix-ui/themes";
import ConfirmationModal from "./ConfirmationModal";
import { ChangeEvent, useCallback, useState } from "react";
import { escapeRegExp, inputRegex, isSupportedChain } from "../utils";
import { maxAmount, minGasFee, supportedChain } from "../configs";
import useWithdraw from "../hooks/useWithdraw";
import { useAccount } from "wagmi";
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

    const { withdraw } = useWithdraw(gasFeeAmountInput);

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
            return toast.error(`Minimum required gas fee is  ${minGasFee}`);
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
        } catch (error: any) {
            let errorText;
            if (error?.message.includes("User rejected the request.")) {
                errorText = "You rejected the transaction";
            } else if (
                error?.message.includes(
                    "transaction exceeds the balance of the account"
                )
            ) {
                errorText = "Insufficient balance to pay for this transaction";
            } else if (error?.message.includes("Invalid Amount")) {
                errorText = `Minimum required gas fee is  ${minGasFee}`;
            } else if (error?.message.includes("not approved to deposit")) {
                errorText = `You need to be approved before you can withdraw`;
            }

            toast.error(errorText || "An error occured!");
        } finally {
            setIsPending(false);
            setIsConfirming(false);
        }
    }, [chainId, gasFeeAmountInput, isConnected, withdraw]);

    return (
        <>
            <Card style={{ width: 650, maxWidth: "100%" }} variant="ghost">
                <Box mb="6" className="pb-4 border-b-2">
                    <Text className="font-bold text-xl">Withdraw</Text>
                </Box>
                <Box>
                    <Box className="w-full">
                        <Flex justify="between">
                            <Text>Allocated Balance:</Text>
                            <Text className="text-gray-400">500,000 USDT</Text>
                        </Flex>
                        <Box my="2" className="relative w-full h-[50px] p-0">
                            <span className="absolute translate-x-2 h-[50px] flex items-center">
                                <span className="text-gray-500">USDT</span>
                            </span>
                            <input
                                className="w-full h-full border-1 border-solid border border-gray-300 outline-purple-400 rounded py-6 px-5 pl-14 font-semibold"
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
                                className="absolute right-0 top-0 -translate-x-2 h-[50px] flex items-center"
                                onClick={handleMaxClick}
                            >
                                <span className="font-semibold text-sm text-[#5A1A6B]">
                                    MAX
                                </span>
                            </button>
                        </Box>
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
