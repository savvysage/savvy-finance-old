import { useCall, useCalls, useEthers } from "@usedapp/core"
import { constants, Contract, utils } from "ethers"
import helperConfig from "../helper-config.json"
import brownieConfig from "../brownie-config.json"
import networkMapping from "../chain-info/deployments/map.json"
import SavvyFinanceFarm from "../chain-info/contracts/SavvyFinanceFarm.json"

export const useContract = (): Contract => {
    const { chainId } = useEthers()
    const networkName = chainId ? helperConfig[String(chainId)] : "dev"

    // const svfTokenAddress = chainId ? networkMapping[String(chainId)]["TransparentUpgradeableProxy"][1] : constants.AddressZero
    // const wbnbTokenAddress = chainId ? brownieConfig["networks"][networkName]["contracts"]["wbnb_token"] : constants.AddressZero
    // const busdTokenAddress = chainId ? brownieConfig["networks"][networkName]["contracts"]["busd_token"] : constants.AddressZero
    // const linkTokenAddress = chainId ? brownieConfig["networks"][networkName]["contracts"]["link_token"] : constants.AddressZero

    const svfFarmAddress = chainId ? networkMapping[String(chainId)]["TransparentUpgradeableProxy"][0] : constants.AddressZero
    const svfFarmInterface = new utils.Interface(SavvyFinanceFarm.abi)
    const svfFarmContract = new Contract(svfFarmAddress, svfFarmInterface)

    return svfFarmContract
}

export const useTokens = (): string[] | undefined => {
    const { value, error } = useCall({
        contract: useContract(),
        method: 'getTokens',
        args: []
    }) ?? {}

    if (error) {
        console.log(error.message)
        return undefined
    }

    return value?.[0]
}

export const useTokensData = (tokenAddresses: string[] | undefined): string[] | undefined => {
    const contract = useContract()
    const calls = tokenAddresses?.map(tokenAddress => ({
        contract: contract,
        method: 'tokensData',
        args: [tokenAddress]
    })) ?? []

    const results = useCalls(calls) ?? []
    results.forEach((result, index) => {
        if (result && result.error) {
            console.error(`${calls[index]?.contract.address}: ${result.error.message}`)
        }
    })

    return results.map(result => result?.value)
}