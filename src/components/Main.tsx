import { useEthers } from "@usedapp/core";
import { constants } from "ethers";
import { Box } from "@mui/system";
import { CircularProgress, Stack } from "@mui/material";
import { TokensTable } from "./Tokens";
import * as svfFarm from "../hooks/savvy_finance_farm";
import { getContractAddress } from "../common";
import tokensJSON from "../tokens.json";

export type Token = {
  address: string;
  isActive: boolean;
  name: string;
  type: number;
  price: number;
  rewardBalance: number;
  stakingBalance: number;
  stakeFee: number;
  unstakeFee: number;
  stakingApr: number;
  rewardToken: string;
  admin: string;
  icon: string[];
  stakerData: svfFarm.TokenStakerData;
};

export const Main = () => {
  const { account } = useEthers();
  const tokensAddresses: string[] = svfFarm.useTokens();
  const tokensData: svfFarm.TokenData[] =
    svfFarm.useTokensData(tokensAddresses);
  // const tokensMainnetAddresses = tokensData.map((tokenData) =>
  //   getContractAddress(tokenData?.name?.toLowerCase() + "_token", "bsc-main")
  // );
  // const tokensPrices: number[] = svfFarm.useTokensPrices(
  //   tokensMainnetAddresses
  // );
  const tokensStakerData: svfFarm.TokenStakerData[] =
    svfFarm.useTokensStakerData(
      tokensAddresses,
      account ?? constants.AddressZero
    );

  const tokens: Token[] = tokensJSON;
  if (tokensAddresses.length !== 0)
    if (
      tokensData.length === tokensAddresses.length &&
      tokensStakerData.length === tokensData.length
    )
      tokensAddresses.forEach((tokenAddress, index) => {
        tokens[index] = {
          address: tokenAddress,
          isActive: tokensData[index].isActive,
          name: tokensData[index].name,
          type: tokensData[index].type,
          price: tokensData[index].price,
          rewardBalance: tokensData[index].rewardBalance,
          stakingBalance: tokensData[index].stakingBalance,
          stakeFee: tokensData[index].stakeFee,
          unstakeFee: tokensData[index].unstakeFee,
          stakingApr: tokensData[index].stakingApr,
          rewardToken: tokensData[index].rewardToken,
          admin: tokensData[index].admin,
          icon:
            tokensData[index].type === 0
              ? [`/icons/${tokensData[index].name.toLowerCase()}.png`]
              : [
                  `/icons/${tokensData[index].name
                    .split("-")[0]
                    .toLowerCase()}.png`,
                  `/icons/${tokensData[index].name
                    .split("-")[1]
                    .toLowerCase()}.png`,
                ],
          stakerData: tokensStakerData[index],
        };
      });

  return (
    <Stack spacing={2}>
      <TokensTable tokens={tokens} />
    </Stack>
  );
};
