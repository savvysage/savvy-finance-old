import { useEthers } from "@usedapp/core";
import { constants } from "ethers";
import { Box, CircularProgress, Stack } from "@mui/material";
import { TokensTable } from "./TokensTable";
import * as svfFarm from "../hooks/savvy_finance_farm";
import { getContractAddress } from "../common";
import tokensJSON from "../tokens.json";

export type Token = svfFarm.TokenData & {
  icon: string[];
  stakerData: svfFarm.TokenStakerData;
};

export const Main = () => {
  var tokensAreUpdated = false;

  const { account: walletAddress } = useEthers();
  const walletIsConnected = walletAddress !== undefined;

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
      walletAddress ?? constants.AddressZero
    );

  const tokens: Token[] = tokensJSON;
  if (tokensAddresses.length !== 0)
    if (
      tokensData.length === tokensAddresses.length &&
      tokensStakerData.length === tokensData.length
    ) {
      tokensAddresses.forEach((tokenAddress, index) => {
        tokens[index] = {
          address: tokensData[index].address,
          isActive: tokensData[index].isActive,
          hasMultiReward: tokensData[index].hasMultiReward,
          name: tokensData[index].name,
          category: tokensData[index].category,
          price: tokensData[index].price,
          rewardBalance: tokensData[index].rewardBalance,
          stakingBalance: tokensData[index].stakingBalance,
          stakeFee: tokensData[index].stakeFee,
          unstakeFee: tokensData[index].unstakeFee,
          stakingApr: tokensData[index].stakingApr,
          rewardToken: tokensData[index].rewardToken,
          admin: tokensData[index].admin,
          timestampAdded: tokensData[index].timestampAdded,
          timestampLastUpdated: tokensData[index].timestampLastUpdated,
          icon:
            tokensData[index].category === 0
              ? [
                  process.env.PUBLIC_URL +
                    `/icons/${tokensData[index].name.toLowerCase()}.png`,
                ]
              : [
                  process.env.PUBLIC_URL +
                    `/icons/${tokensData[index].name
                      .split("-")[0]
                      .toLowerCase()}.png`,
                  process.env.PUBLIC_URL +
                    `/icons/${tokensData[index].name
                      .split("-")[1]
                      .toLowerCase()}.png`,
                ],
          stakerData: tokensStakerData[index],
        };
      });
      tokensAreUpdated = true;
    }

  return (
    <>
      {!tokensAreUpdated ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        ""
      )}
      <Stack spacing={2}>
        <TokensTable tokens={tokens} tokensAreUpdated={tokensAreUpdated} />
      </Stack>
    </>
  );
};
