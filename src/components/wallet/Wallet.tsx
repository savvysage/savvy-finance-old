import { Box, Typography } from "@mui/material"
import { Token } from "../Main"

interface YourWalletProps {
    supportedTokens: Array<Token>
}

export const Wallet = ({ supportedTokens }: YourWalletProps) => {
    return (
        <Box>
            <Typography>Your Wallet...</Typography>
        </Box>
    )
}