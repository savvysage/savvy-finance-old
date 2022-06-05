import { useCall, useCalls, useEthers } from "@usedapp/core";
import { constants, Contract, utils } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { useState } from "react";
import axios from "axios";
// import { networks } from "../helper-config.json"
import contractAddresses from "../back_end_build/deployments/map.json";
import SavvyFinanceFarm from "../back_end_build/contracts/SavvyFinanceFarm.json";

// axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

export type TokenData = {
  address: string;
  isActive: boolean;
  hasMultiReward: boolean;
  name: string;
  category: number;
  price: number;
  rewardBalance: number;
  stakingBalance: number;
  stakeFee: number;
  unstakeFee: number;
  stakingApr: number;
  rewardToken: string;
  admin: string;
  timestampAdded: number;
  timestampLastUpdated: number;
};

export type TokenStakerData = {
  walletBalance: number;
  rewardBalance: number;
  stakingBalance: number;
  stakingRewardToken: string;
  stakingRewards: {
    id: number;
    staker: string;
    stakedToken: string;
    stakedTokenPrice: number;
    stakedTokenAmount: number;
    rewardToken: string;
    rewardTokenPrice: number;
    rewardTokenAmount: number;
    stakingDurationInSeconds: number;
    actionPerformed: string[2];
    timestampAdded: number;
    timestampLastUpdated: number;
  }[];
  timestampLastRewarded: number;
  timestampAdded: number;
  timestampLastUpdated: number;
};

export const useContract = (): Contract => {
  const { chainId } = useEthers();

  // const networkName = chainId ? networks[String(chainId)] : "bsc-test"
  const svfFarmAddress = chainId
    ? contractAddresses[String(chainId)]["TransparentUpgradeableProxy"][0]
    : constants.AddressZero;
  const svfFarmInterface = new utils.Interface(SavvyFinanceFarm.abi);

  return new Contract(svfFarmAddress, svfFarmInterface);
};

export const useTokens = (): string[] => {
  var tokens: string[] = [];

  const contract = useContract();
  const { value, error } =
    useCall({
      contract: contract,
      method: "getTokens",
      args: [],
    }) ?? {};

  if (value) tokens = value[0];
  if (error) console.error(error.message);

  return tokens;
};

export const useTokensData = (tokensAddresses: string[]): TokenData[] | [] => {
  var tokensData: TokenData[] | [] = [];

  const contract = useContract();
  const calls =
    tokensAddresses.map((tokenAddress) => ({
      contract: contract,
      method: "getTokenData",
      args: [tokenAddress],
    })) ?? [];
  const results = useCalls(calls) ?? [];

  results.forEach((result, index) => {
    if (result?.value) {
      // console.log(result.value[0]);
      const address = calls[index]["args"][0];
      const isActive = result.value[0]["isActive"];
      const hasMultiReward = result.value[0]["hasMultiReward"];
      const name = result.value[0]["name"];
      const category = parseInt(result.value[0]["category"]);
      const price = parseFloat(formatEther(result.value[0]["price"]));
      const rewardBalance = parseFloat(
        formatEther(result.value[0]["rewardBalance"])
      );
      const stakingBalance = parseFloat(
        formatEther(result.value[0]["stakingBalance"])
      );
      const stakeFee = parseInt(formatEther(result.value[0]["stakeFee"]));
      const unstakeFee = parseInt(formatEther(result.value[0]["unstakeFee"]));
      const stakingApr = parseInt(formatEther(result.value[0]["stakingApr"]));
      const rewardToken = result.value[0]["rewardToken"];
      const admin = result.value[0]["admin"];
      const timestampAdded = parseInt(result.value[0]["timestampAdded"]);
      const timestampLastUpdated = parseInt(
        result.value[0]["timestampLastUpdated"]
      );
      tokensData[index] = {
        address: address,
        isActive: isActive,
        hasMultiReward: hasMultiReward,
        name: name,
        category: category,
        price: price,
        rewardBalance: rewardBalance,
        stakingBalance: stakingBalance,
        stakeFee: stakeFee,
        unstakeFee: unstakeFee,
        stakingApr: stakingApr,
        rewardToken: rewardToken,
        admin: admin,
        timestampAdded: timestampAdded,
        timestampLastUpdated: timestampLastUpdated,
      };
    }
    if (result?.error)
      console.error(tokensAddresses[index], result.error.message);
  });

  return tokensData;
};

export const useTokensStakerData = (
  tokensAddresses: string[],
  stakerAddress: string
): TokenStakerData[] | [] => {
  var tokensStakerData: TokenStakerData[] | [] = [];

  const contract = useContract();
  const calls =
    tokensAddresses.map((tokenAddress) => ({
      contract: contract,
      method: "getTokenStakerData",
      args: [tokenAddress, stakerAddress],
    })) ?? [];
  const results = useCalls(calls) ?? [];

  results.forEach((result, index) => {
    if (result?.value) {
      // console.log(result.value[0]);
      const walletBalance = 0;
      const rewardBalance = parseFloat(
        formatEther(result.value[0]["rewardBalance"])
      );
      const stakingBalance = parseFloat(
        formatEther(result.value[0]["stakingBalance"])
      );
      const stakingRewardToken = result.value[0]["stakingRewardToken"];
      const stakingRewards = result.value[0]["stakingRewards"].map(
        (stakingReward: {}) => {
          // console.log(stakingReward);
          return {
            id: parseInt(stakingReward["id"]),
            staker: stakingReward["staker"],
            stakedToken: stakingReward["stakedToken"],
            stakedTokenPrice: parseFloat(
              formatEther(stakingReward["stakedTokenPrice"])
            ),
            stakedTokenAmount: parseFloat(
              formatEther(stakingReward["stakedTokenAmount"])
            ),
            rewardToken: stakingReward["rewardToken"],
            rewardTokenPrice: parseFloat(
              formatEther(stakingReward["rewardTokenPrice"])
            ),
            rewardTokenAmount: parseFloat(
              formatEther(stakingReward["rewardTokenAmount"])
            ),
            stakingDurationInSeconds: parseFloat(
              formatEther(stakingReward["stakingDurationInSeconds"])
            ),
            actionPerformed: [
              stakingReward["actionPerformed"][0],
              stakingReward["actionPerformed"][1],
            ],
            timestampAdded: parseInt(stakingReward["timestampAdded"]),
            timestampLastUpdated: parseInt(
              stakingReward["timestampLastUpdated"]
            ),
          };
        }
      );
      const timestampLastRewarded = parseInt(
        result.value[0]["timestampLastRewarded"]
      );
      const timestampAdded = parseInt(result.value[0]["timestampAdded"]);
      const timestampLastUpdated = parseInt(
        result.value[0]["timestampLastUpdated"]
      );
      tokensStakerData[index] = {
        walletBalance: walletBalance,
        rewardBalance: rewardBalance,
        stakingBalance: stakingBalance,
        stakingRewardToken: stakingRewardToken,
        stakingRewards: stakingRewards,
        timestampLastRewarded: timestampLastRewarded,
        timestampAdded: timestampAdded,
        timestampLastUpdated: timestampLastUpdated,
      };
    }
    if (result?.error)
      console.error(tokensAddresses[index], result.error.message);
  });

  return tokensStakerData;
};

export const useTokensPrices = (tokensAddresses: string[]): number[] => {
  const [tokensPrices, setTokensPrices] = useState<number[]>([]);

  tokensAddresses.forEach((tokenAddress, index) => {
    if (tokenAddress !== undefined)
      (async () => {
        try {
          const response = await axios.get(
            `https://api.pancakeswap.info/api/v2/tokens/${tokenAddress}`
          );
          if (response.data.data.price)
            setTokensPrices((tokensPrices) => {
              tokensPrices[index] = response.data.data.price;
              return tokensPrices;
            });
        } catch (error) {
          console.error(error);
        }
      })();
  });

  return tokensPrices;
};
