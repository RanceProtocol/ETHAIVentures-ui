import { Box, Card, Flex, Text } from "@radix-ui/themes";

const WithdrawCard = () => {
    return (
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
                            type="text"
                            className="w-full h-full border-1 border-solid border border-gray-300 outline-purple-400 rounded py-6 px-5 font-semibold"
                        />
                        <button className="font-semibold absolute right-0 -translate-x-2 translate-y-3 text-sm text-[#5A1A6B]">
                            MAX
                        </button>
                    </Box>
                    <Flex mt="6" justify="between">
                        <Text>Estimate gas fee</Text>
                        <Text>0.00003ETH</Text>
                    </Flex>
                    <Box mt="9">
                        <button className="w-full text-white bg-[#5A1A6B] p-3 rounded-md">
                            Confirm withdrawal
                        </button>
                    </Box>
                </Box>
            </Box>
        </Card>
    );
};

export default WithdrawCard;
