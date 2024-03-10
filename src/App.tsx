import { Box, Container } from "@radix-ui/themes";
import Header from "./components/Header";
import WithdrawCard from "./components/WithdrawCard";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    return (
        <Box>
            <Container>
                <Header />
                <main className="mt-12 w-full flex justify-center">
                    <WithdrawCard />
                    <ToastContainer
                        position="bottom-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                        transition={Bounce}
                    />
                </main>
            </Container>
        </Box>
    );
}

export default App;
