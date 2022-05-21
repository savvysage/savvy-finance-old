import { constants } from 'ethers'
import { useEthers } from '@usedapp/core'
import { Stack } from "@mui/material"
import { Wallet } from './wallet'
import { Tokens } from "./Tokens"
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
    image: string
}

export const Main = () => {
    const { chainId } = useEthers()
    const networkName = chainId ? helperConfig[String(chainId)] : "dev"

    const svfTokenAddress = chainId ? networkMapping[String(chainId)]["TransparentUpgradeableProxy"][1] : constants.AddressZero
    const wbnbTokenAddress = chainId ? brownieConfig["networks"][networkName]["contracts"]["wbnb_token"] : constants.AddressZero
    const busdTokenAddress = chainId ? brownieConfig["networks"][networkName]["contracts"]["busd_token"] : constants.AddressZero
    const linkTokenAddress = chainId ? brownieConfig["networks"][networkName]["contracts"]["link_token"] : constants.AddressZero

    const supportedTokens: Array<Token> = [
        { address: svfTokenAddress, name: "SVF", image: svfIcon },
        { address: wbnbTokenAddress, name: "BNB", image: bnbIcon },
        { address: busdTokenAddress, name: "BUSD", image: busdIcon },
        { address: linkTokenAddress, name: "LINK", image: linkIcon }
    ]

    return (
        <Stack spacing={2}>
            {/* <Wallet supportedTokens={supportedTokens} /> */}
            <Tokens supportedTokens={supportedTokens} />
        </Stack>
    )
}