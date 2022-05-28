import { useCall, useCalls, useEthers } from "@usedapp/core"
import { constants, Contract, utils } from "ethers"
import { formatEther } from "ethers/lib/utils"
import { useState } from "react"
import axios from "axios"
// import { networks } from "../helper-config.json"
import contractAddresses from "../chain-info/deployments/map.json"
import SavvyFinanceFarm from "../chain-info/contracts/SavvyFinanceFarm.json"

export type TokenData = {
    isActive: boolean
    name: string
    type: number
    price: number
    rewardBalance: number
    stakingBalance: number
    stakeFee: number
    unstakeFee: number
    stakingApr: number
    rewardToken: string
    admin: string
}

export type StakingData = {
    balance: number
    rewardToken: string
}

export const useContract = (): Contract => {
    const { chainId } = useEthers()

    // const networkName = chainId ? networks[String(chainId)] : "bsc-test"
    const svfFarmAddress = chainId ? contractAddresses[String(chainId)]["TransparentUpgradeableProxy"][0]
        : constants.AddressZero
    const svfFarmInterface = new utils.Interface(SavvyFinanceFarm.abi)

    return new Contract(svfFarmAddress, svfFarmInterface)
}

export const useTokens = (): string[] => {
    var tokens: string[] = []

    const contract = useContract()
    const { value, error } = useCall({
        contract: contract,
        method: 'getTokens',
        args: []
    }) ?? {}

    if (value) tokens = value[0]
    if (error) console.error(error.message)

    return tokens
}

export const useTokensData = (tokensAddresses: string[]): TokenData[] | [] => {
    var tokensData: TokenData[] | [] = [];

    const contract = useContract()
    const calls = tokensAddresses.map(tokenAddress => ({
        contract: contract,
        method: 'tokensData',
        args: [tokenAddress]
    })) ?? []
    const results = useCalls(calls) ?? []

    results.forEach((result, index) => {
        if (result?.value) {
            const isActive = result.value["isActive"]
            const name = result.value["name"]
            const type = parseInt(result.value["_type"])
            const price = parseFloat(formatEther(result.value["price"]))
            const rewardBalance = parseFloat(formatEther(result.value["rewardBalance"]))
            const stakingBalance = parseFloat(formatEther(result.value["stakingBalance"]))
            const stakeFee = parseInt(formatEther(result.value["stakeFee"]))
            const unstakeFee = parseInt(formatEther(result.value["unstakeFee"]))
            const stakingApr = parseInt(formatEther(result.value["stakingApr"]))
            const rewardToken = result.value["rewardToken"]
            const admin = result.value["admin"]
            tokensData[index] = {
                isActive: isActive, name: name, type: type, price: price,
                rewardBalance: rewardBalance, stakingBalance: stakingBalance,
                stakeFee: stakeFee, unstakeFee: unstakeFee, stakingApr: stakingApr,
                rewardToken: rewardToken, admin: admin
            }
        }
        if (result?.error) console.error(tokensAddresses[index], result.error.message)
    })

    return tokensData
}

export const useStakingData = (tokensAddresses: string[], stakerAddress: string)
    : StakingData[] | [] => {
    var stakingData: StakingData[] | [] = [];

    const contract = useContract()
    const calls = tokensAddresses.map(tokenAddress => ({
        contract: contract,
        method: 'stakingData',
        args: [tokenAddress, stakerAddress]
    })) ?? []
    const results = useCalls(calls) ?? []

    results.forEach((result, index) => {
        if (result?.value) {
            const balance = parseFloat(formatEther(result.value["balance"]))
            const rewardToken = result.value["rewardToken"]
            stakingData[index] = { balance: balance, rewardToken: rewardToken }
        }
        if (result?.error) console.error(tokensAddresses[index], result.error.message)
    })

    return stakingData
}


export const useTokensPrices = (tokensAddresses: string[]): number[] => {
    const [tokensPrices, setTokensPrices] = useState<number[]>([])

    tokensAddresses.forEach((tokenAddress, index) => {
        if (tokenAddress !== undefined) (async () => {
            try {
                const response = await axios.get(
                    `https://api.pancakeswap.info/api/v2/tokens/${tokenAddress}`
                )
                if (response.data.data.price) setTokensPrices(tokensPrices => {
                    tokensPrices[index] = response.data.data.price
                    return tokensPrices
                })
            } catch (error) { console.error(error) }
        }
        )()
    })

    return tokensPrices
}