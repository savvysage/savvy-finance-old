import { constants } from 'ethers'
import { useEthers } from '@usedapp/core'
import { Stack } from "@mui/material"
import { Tokens } from "./Tokens"
import helperConfig from "../helper-config.json"
import brownieConfig from "../brownie-config.json"
import networkMapping from "../chain-info/deployments/map.json"

export const Main = () => {
    const { chainId } = useEthers()
    const networkName = chainId ? helperConfig[String(chainId)] : "dev"

    const svfTokenAddress = chainId ? networkMapping[String(chainId)]["TransparentUpgradeableProxy"][1] : constants.AddressZero
    const wbnbTokenAddress = chainId ? brownieConfig["networks"][networkName]["contracts"]["wbnb_token"] : constants.AddressZero
    const busdTokenAddress = chainId ? brownieConfig["networks"][networkName]["contracts"]["busd_token"] : constants.AddressZero
    const linkTokenAddress = chainId ? brownieConfig["networks"][networkName]["contracts"]["link_token"] : constants.AddressZero

    return (
        <Stack spacing={2}>
            <Tokens />
        </Stack>
    )
}