import React from "react";
import { useEthers, useSendTransaction, useTokenBalance } from "@usedapp/core";
import { constants } from "ethers";
import { formatEther } from "ethers/lib/utils";
import {
  Box,
  Button,
  Divider,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Token } from "./Main";
import { ConnectWallet } from "./ConnectWallet";
import { useContract } from "../hooks/savvy_finance_farm";

function StakerStakingInfo(props: { token: Token; tokens: Token[] }) {
  const { token, tokens } = props;
  const { account: walletAddress } = useEthers();
  const walletIsConnected = walletAddress !== undefined;

  const svfFarmContract = useContract();
  const { sendTransaction } = useSendTransaction();
  const handleChangeStakingRewardToken = (event: SelectChangeEvent) => {
    console.log(event.target.value);
    // sendTransaction({
    //   to: svfFarmContract.address,
    //   value: parseEther(event.target.value),
    // });
  };

  return (
    <Stack spacing={2.5}>
      <Box component={Paper} p={2.5}>
        <FormControl fullWidth>
          <InputLabel>Reward Token</InputLabel>
          <Select
            label="Reward Token"
            defaultValue={
              token.stakerData.stakingRewardToken !== constants.AddressZero
                ? token.stakerData.stakingRewardToken
                : token.rewardToken
            }
            onChange={handleChangeStakingRewardToken}
          >
            {tokens.map((token) => (
              <MenuItem key={token.name} value={token.address}>
                {token.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Stack>
  );
}

export const StakingTable = (props: { token: Token; tokens: Token[] }) => {
  const { token, tokens } = props;
  const { account: walletAddress } = useEthers();
  const walletIsConnected = walletAddress !== undefined;
  token.stakerData.walletBalance = parseFloat(
    formatEther(useTokenBalance(token.address, walletAddress) ?? 0)
  );

  const [withrawRewardAmount, setWithrawRewardAmount] = React.useState("");
  const handleChangeWithrawRewardAmount = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setWithrawRewardAmount(event.target.value);
  };
  const handleMaxWithrawRewardAmount = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setWithrawRewardAmount(token.stakerData.rewardBalance.toString());
  };
  const handleWithrawReward = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(withrawRewardAmount);
  };

  const [stakingOption, setStakingOption] = React.useState("stake");
  const handleChangeStakingOption = (
    event: React.SyntheticEvent,
    newOption: string
  ) => {
    setStakingOption(newOption);
  };

  const [stakingAmount, setStakingAmount] = React.useState("");
  const handleChangeStakingAmount = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStakingAmount(event.target.value);
  };
  const handleMaxStakingAmount = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (stakingOption === "stake")
      setStakingAmount(token.stakerData.walletBalance.toString());
    if (stakingOption === "unstake")
      setStakingAmount(token.stakerData.stakingBalance.toString());
  };
  const handleStaking = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (stakingOption === "stake") console.log(stakingOption);
    if (stakingOption === "unstake") console.log(stakingOption);
  };

  return (
    <Box sx={{ margin: 1 }}>
      <Table size="small" aria-label="staking">
        <TableBody>
          <TableRow>
            <TableCell sx={{ width: { sm: "50%" }, verticalAlign: "top" }}>
              <Stack spacing={2.5}>
                <Box component={Paper} p={2.5}>
                  <Typography variant="body2">
                    Your {token.name} Reward Balance:{" "}
                    {token.stakerData.rewardBalance.toLocaleString("en-us")}
                  </Typography>
                  <TextField
                    label="Amount"
                    type="number"
                    margin="normal"
                    value={withrawRewardAmount}
                    onChange={handleChangeWithrawRewardAmount}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Button onClick={handleMaxWithrawRewardAmount}>
                            MAX
                          </Button>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <br />
                  {!walletIsConnected ? (
                    <ConnectWallet />
                  ) : (
                    <Button
                      variant="contained"
                      size="large"
                      color="secondary"
                      onClick={handleWithrawReward}
                    >
                      Withdraw Reward
                    </Button>
                  )}
                </Box>
                <Box component={Paper}>
                  <TabContext value={stakingOption}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <TabList
                        onChange={handleChangeStakingOption}
                        aria-label="staking options"
                      >
                        <Tab label="Stake" value="stake" />
                        <Tab label="Unstake" value="unstake" />
                      </TabList>
                    </Box>
                    <TabPanel value={stakingOption}>
                      <Typography variant="body2">
                        Your Wallet Balance:{" "}
                        {token.stakerData.walletBalance.toLocaleString("en-us")}{" "}
                        {token.name}
                      </Typography>
                      <Typography variant="body2">
                        Your Staking Balance:{" "}
                        {token.stakerData.stakingBalance.toLocaleString(
                          "en-us"
                        )}{" "}
                        {token.name}
                      </Typography>
                      <br />
                      <Divider />
                      <br />
                      <Typography variant="body2">
                        Stake Fee: {token.stakeFee.toLocaleString("en-us")}%
                      </Typography>
                      <Typography variant="body2">
                        Unstake Fee: {token.unstakeFee.toLocaleString("en-us")}%
                      </Typography>
                      <TextField
                        label="Amount"
                        type="number"
                        margin="normal"
                        value={stakingAmount}
                        onChange={handleChangeStakingAmount}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Button onClick={handleMaxStakingAmount}>
                                MAX
                              </Button>
                            </InputAdornment>
                          ),
                        }}
                      />
                      <br />
                      {!walletIsConnected ? (
                        <ConnectWallet />
                      ) : (
                        <Button
                          variant="contained"
                          size="large"
                          color="secondary"
                          onClick={handleStaking}
                        >
                          {stakingOption}
                        </Button>
                      )}
                    </TabPanel>
                  </TabContext>
                </Box>
                <Box display={{ xs: "block", sm: "none" }}>
                  <StakerStakingInfo token={token} tokens={tokens} />
                </Box>
              </Stack>
            </TableCell>
            <TableCell sx={{ width: { sm: "50%" }, verticalAlign: "top" }}>
              <Box display={{ xs: "none", sm: "block" }}>
                <StakerStakingInfo token={token} tokens={tokens} />
              </Box>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
};
