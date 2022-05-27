import { Box } from "@mui/system"
import { CircularProgress, Stack } from "@mui/material"
import { StakingTable } from "./Staking"
import { getContractAddress } from "../common"
import * as svfFarm from "../hooks/savvy_finance_farm"

export type Token = {
    address: string
    isActive: boolean
    name: string
    type: number
    price: number
    balance: number
    stakeFee: number
    unstakeFee: number
    stakingApr: number
    rewardToken: string
    admin: string
    icon: string[]
}

export const Main = () => {
    const tokensAddresses: string[] = svfFarm.useTokens()
    const tokensAreActive: boolean[] = svfFarm.useTokensAreActive(tokensAddresses)
    const tokensData: svfFarm.TokenData[] = svfFarm.useTokensData(tokensAddresses)
    const tokensMainnetAddresses = tokensData.map(tokenData => getContractAddress(
        tokenData?.name?.toLowerCase() + "_token", "bsc-main"
    ))
    const tokensPrices: number[] = svfFarm.useTokensPrices(tokensMainnetAddresses)

    const tokens: Token[] = []
    if (tokensAddresses.length !== 0)
        if (
            tokensAreActive.length === tokensAddresses.length &&
            tokensData.length === tokensAddresses.length &&
            tokensPrices.length === tokensAddresses.length
        ) tokensAddresses.forEach((tokenAddress, index) => {
            tokens[index] = {
                address: tokenAddress, isActive: tokensAreActive[index],
                name: tokensData[index].name, type: tokensData[index].type,
                price: tokensPrices[index], balance: tokensData[index].balance,
                stakeFee: tokensData[index].stakeFee, unstakeFee: tokensData[index].unstakeFee,
                stakingApr: tokensData[index].stakingApr, rewardToken: tokensData[index].rewardToken,
                admin: tokensData[index].admin, icon: tokensData[index].type === 0 ?
                    [`/icons/${tokensData[index].name?.toLowerCase()}.png`] : [
                        `/icons/${tokensData[index].name?.split("-")[0].toLowerCase()}.png`,
                        `/icons/${tokensData[index].name?.split("-")[1].toLowerCase()}.png`
                    ]
            }
        })
    console.log(tokens)

    return (
        <Box sx={{ display: 'flex' }}>
            <CircularProgress />
        </Box>
    )
    // if (tokens.length !== 0) return (
    //     <Stack spacing={2}>
    //         <StakingTable tokens={tokens} />
    //     </Stack>
    // )
    // else return (
    //     <Box sx={{ display: 'flex' }}>
    //         <CircularProgress />
    //     </Box>
    // )
}