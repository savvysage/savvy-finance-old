import { formatEther } from "ethers/lib/utils"
import { Box } from "@mui/system"
import { CircularProgress, Stack } from "@mui/material"
import { TokenData, useTokens, useTokensAreActive, useTokensData, useTokensPrices } from "../hooks/savvy_finance_farm"
import { StakingTable } from "./Staking"
import { getContractAddress } from "../common"

export type Token = {
    address: string
    isActive: boolean
    name: string
    type: number
    icon: string[]
    balance: number
    price: number
    stakingApr: number
}

export const Main = () => {
    const tokensAddresses: string[] = useTokens()
    const tokensAreActive: boolean[] = useTokensAreActive(tokensAddresses)
    const tokensData: TokenData[] = useTokensData(tokensAddresses)
    const tokensMainnetAddresses = tokensData.map(tokenData => getContractAddress(
        tokenData?.name?.toLowerCase() + "_token", "bsc-main"
    ))
    const tokensPrices: number[] = useTokensPrices(tokensMainnetAddresses)
    // const tokens: Array<Token> = []
    // if (tokensData !== undefined && tokensPrices.length !== 0) {
    //     tokensData?.forEach((tokenData, index) => {
    //         if (tokenData !== undefined) {
    //             const address = tokensAddresses?.[index]
    //             const isActive = tokensAreActive?.[index]
    //             const name = tokenData["name"]
    //             const type = parseInt(formatEther(tokenData["_type"]))
    //             const icon = type === 0 ? [`/icons/${name.toLowerCase()}.png`] : [
    //                 `/icons/${name.split("-")[0].toLowerCase()}.png`,
    //                 `/icons/${name.split("-")[1].toLowerCase()}.png`
    //             ]
    //             const balance = parseFloat(formatEther(tokenData["balance"]))
    //             const price = 6
    //             // const price = tokensPrices[index]
    //             const stakingApr = parseFloat(formatEther(tokenData["stakingApr"]))
    //             const token: Token = {
    //                 address: address, isActive: isActive, name: name, type: type,
    //                 icon: icon, balance: balance, price: price, stakingApr: stakingApr
    //             }
    //             tokens?.push(token)
    //         }
    //     })
    // }

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