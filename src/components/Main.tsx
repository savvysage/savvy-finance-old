import { formatEther } from "ethers/lib/utils"
import { Box } from "@mui/system"
import { CircularProgress, Stack } from "@mui/material"
import { useTokens, useTokensAreActive, useTokensData } from "../hooks/savvy_finance_farm"
import { StakingTable } from "./Staking"

export type Token = {
    address: string | undefined
    isActive: boolean | undefined
    name: string
    type: number
    icon: string[]
    balance: number
    stakingApr: number
}

export const Main = () => {
    const tokenAddresses = useTokens()
    const tokensAreActive = useTokensAreActive(tokenAddresses)
    const tokensData = useTokensData(tokenAddresses)

    const tokens: Array<Token> = []
    if (tokensData !== undefined) {
        tokensData?.forEach((tokenData, index) => {
            if (tokenData !== undefined) {
                const address = tokenAddresses?.[index]
                const isActive = tokensAreActive?.[index]
                const name = tokenData["name"]
                const type = parseInt(formatEther(tokenData["_type"]))
                const icon = type === 0 ? [`/icons/${name.toLowerCase()}.png`] : [
                    `/icons/${name.split("-")[0].toLowerCase()}.png`,
                    `/icons/${name.split("-")[1].toLowerCase()}.png`
                ]
                const balance = parseFloat(formatEther(tokenData["balance"]))
                const stakingApr = parseFloat(formatEther(tokenData["stakingApr"]))
                const token: Token = {
                    address: address, isActive: isActive, name: name, type: type,
                    icon: icon, balance: balance, stakingApr: stakingApr
                }
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