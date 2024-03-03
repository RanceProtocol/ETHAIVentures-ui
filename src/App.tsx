import "./App.css";
import { Box, Container } from "@radix-ui/themes";
import Header from "./components/Header";
import WithdrawCard from "./components/WithdrawCard";

function App() {
    return (
        <Box>
            <Container>
                <Header />
                <main className="mt-12 w-full flex justify-center">
                    <WithdrawCard />
                </main>
            </Container>
        </Box>
    );
}

export default App;
