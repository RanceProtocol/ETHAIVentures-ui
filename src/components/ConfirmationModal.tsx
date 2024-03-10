import { Box, Dialog, Flex, Text } from "@radix-ui/themes";
import fuelPumpImg from "../assets/fuel-pump.png";
import { ChangeEvent } from "react";
import { minGasFee } from "../configs";

const ConfirmationModal = ({
    open,
    handleInputChange,
    confirmWithdrawal,
    handleClose,
    isPending,
    isConfirming,
    value,
}: {
    open: boolean;

    handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
    confirmWithdrawal: () => void;
    handleClose: () => void;
    isPending: boolean;
    isConfirming: boolean;
    value: string;
}) => {
    return (
        <Dialog.Root defaultOpen={false} open={open}>
            <Dialog.Content style={{ maxWidth: 450, position: "relative" }}>
                <Dialog.Title>Confirm Withdrawal</Dialog.Title>

                <Flex direction="column" gap="3" className="mt-10">
                    <Flex direction="column" align={"center"}>
                        <img src={fuelPumpImg} className="h-16" />
                        <Text className="text-black">enter your gas fee</Text>
                    </Flex>
                    <Text className="text-gray-400">Gas fee</Text>
                    <Box my="2" className="relative w-full h-[50px] p-0">
                        <span className="absolute translate-x-2 h-[50px] flex items-center">
                            <span className="text-gray-500">ETH</span>
                        </span>
                        <input
                            className="w-full h-full border-1 border-solid border border-gray-300 outline-purple-400 rounded py-6 px-5 pl-10 font-semibold"
                            type="text"
                            inputMode="decimal"
                            autoComplete="off"
                            autoCorrect="off"
                            pattern="^[0-9]*[.,]?[0-9]*$"
                            placeholder="0"
                            minLength={1}
                            maxLength={79}
                            spellCheck="false"
                            value={value}
                            onChange={handleInputChange}
                        />
                    </Box>
                    <Box mt="9">
                        <button
                            className="w-full text-white bg-[#5A1A6B] p-3 rounded-md disabled:bg-slate-300"
                            onClick={confirmWithdrawal}
                            disabled={
                                Number(value) < Number(minGasFee) ||
                                isPending ||
                                isConfirming
                            }
                        >
                            {isPending
                                ? "Approve transaction in your wallet"
                                : isConfirming
                                ? "Confirming withdrawal..."
                                : "Confirm withdrawal"}
                        </button>
                    </Box>
                </Flex>
                <Dialog.Close
                    className="absolute top-4 right-4"
                    onClick={handleClose}
                >
                    <button>&#10005;</button>
                </Dialog.Close>
            </Dialog.Content>
        </Dialog.Root>
    );
};

export default ConfirmationModal;
