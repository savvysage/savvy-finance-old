import { constants } from 'ethers'
import { useEthers } from '@usedapp/core'
import { Stack } from "@mui/material"
import { Wallet } from './wallet'
import { StakingTable } from "./Staking"
import helperConfig from "../helper-config.json"
import brownieConfig from "../brownie-config.json"
import networkMapping from "../chain-info/deployments/map.json"
import svfIcon from "../icons/svf.png"
import bnbIcon from "../icons/bnb.png"
import busdIcon from "../icons/busd.png"
import linkIcon from "../icons/link.png"

export type Token = {
    address: string
    name: string
    icon: string
}

export const Main = () => {
    const { chainId } = useEthers()
    const networkName = chainId ? helperConfig[String(chainId)] : "dev"

    const svfTokenAddress = chainId ? networkMapping[String(chainId)]["TransparentUpgradeableProxy"][1] : constants.AddressZero
    const wbnbTokenAddress = chainId ? brownieConfig["networks"][networkName]["contracts"]["wbnb_token"] : constants.AddressZero
    const busdTokenAddress = chainId ? brownieConfig["networks"][networkName]["contracts"]["busd_token"] : constants.AddressZero
    const linkTokenAddress = chainId ? brownieConfig["networks"][networkName]["contracts"]["link_token"] : constants.AddressZero

    const tokens: Array<Token> = [
        { address: svfTokenAddress, name: "SVF", icon: svfIcon },
        { address: wbnbTokenAddress, name: "BNB", icon: bnbIcon },
        { address: busdTokenAddress, name: "BUSD", icon: busdIcon },
        { address: linkTokenAddress, name: "LINK", icon: linkIcon }
    ]

    return (
        <Stack spacing={2}>
            <StakingTable tokens={tokens} />
        </Stack>
    )
}