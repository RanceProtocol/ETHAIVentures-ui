import { Box } from "@radix-ui/themes";
import logoImage from "../assets/logo.png";

const Header = () => {
    return (
        <header className="flex items-center justify-between">
            <Box>
                <img src={logoImage} className="h-9" />
            </Box>
            <w3m-button />
        </header>
    );
};

export default Header;
