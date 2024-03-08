import { Box, Dialog, Flex, Text } from "@radix-ui/themes";
import fuelPumpImg from "../assets/fuel-pump.png";
const ConfirmationModal = ({
    open,
    handleClose,
}: {
    open: boolean;
    handleClose: () => void;
}) => {
    return (
        <Dialog.Root defaultOpen={false} open={open}>
            <Dialog.Content style={{ maxWidth: 450 }}>
                <Dialog.Title>Confirm Withdrawal</Dialog.Title>

                <Flex direction="column" gap="3" className="mt-10">
                    <Flex direction="column" align={"center"}>
                        <img src={fuelPumpImg} className="h-16" />
                        <Text className="text-black">enter your gas fee</Text>
                    </Flex>
                    <Text className="text-gray-400">Gas fee</Text>
                    <Box my="2" className="relative w-full h-10">
                        <span className="absolute translate-x-2 translate-y-3 text-gray-500">
                            $
                        </span>
                        <input
                            type="text"
                            className="w-full h-full border-1 border-solid border border-gray-300 outline-purple-400 rounded py-6 px-5 font-semibold"
                        />
                    </Box>
                    <Box mt="9">
                        <button
                            className="w-full text-white bg-[#5A1A6B] p-3 rounded-md"
                            onClick={handleClose}
                        >
                            Confirm withdrawal
                        </button>
                    </Box>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    );
};

export default ConfirmationModal;
