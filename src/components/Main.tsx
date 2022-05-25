import { formatEther } from "ethers/lib/utils"
import { Box } from "@mui/system"
import { CircularProgress, Stack } from "@mui/material"
import { useTokens, useTokensData } from "../hooks/savvy_finance_farm"
import { StakingTable } from "./Staking"

export type Token = {
    address: string | undefined
    name: string
    type: number
    icon: string[]
}

export const Main = () => {
    const tokenAddresses = useTokens()
    const tokensData = useTokensData(tokenAddresses)

    const tokens: Array<Token> = []
    if (tokensData !== undefined) {
        tokensData?.forEach((tokenData, index) => {
            if (tokenData !== undefined) {
                const address = tokenAddresses?.[index]
                const name = tokenData["name"]
                const type = parseInt(formatEther(tokenData["_type"]))
                const icon = type === 0 ? [`/icons/${name.toLowerCase()}.png`] : [
                    `/icons/${name.split("-")[0].toLowerCase()}.png`,
                    `/icons/${name.split("-")[1].toLowerCase()}.png`
                ]
                const token: Token = { address: address, name: name, type: type, icon: icon }
                tokens?.push(token)
            }
        })
    }

    if (tokens !== undefined) return (
        <Stack spacing={2}>
            <StakingTable tokens={tokens} />
        </Stack>
    )
    else return (
        <Box sx={{ display: 'flex' }}>
            <CircularProgress />
        </Box>
    )
}