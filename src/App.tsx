import "./App.css";
import { Box, Container, Text } from "@radix-ui/themes";

function App() {
    return (
        <Box>
            <Container>
                <header>
                    <Box>Header</Box>
                </header>
                <main>
                    <Text className="text-3xl font-bold underline">
                        Hello world!
                    </Text>
                </main>
            </Container>
        </Box>
    );
}

export default App;
