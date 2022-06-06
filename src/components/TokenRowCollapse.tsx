import React from "react";
import { useEthers, useTokenBalance } from "@usedapp/core";
import { constants } from "ethers";
import { formatEther } from "ethers/lib/utils";
import {
  Box,
  Button,
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

function Actions(props: { token: Token; tokens: Token[] }) {
  const { token, tokens } = props;
  const { account: walletAddress } = useEthers();
  const walletIsConnected = walletAddress !== undefined;

  token.stakerData.walletBalance = parseFloat(
    formatEther(useTokenBalance(token.address, walletAddress) ?? 0)
  );

  const [tabOption, setTabOption] = React.useState("stake");
  const handleChangeTabOption = (
    event: React.SyntheticEvent,
    newOption: string
  ) => {
    setTabOption(newOption);
  };

  const [tabAmount, setTabAmount] = React.useState("");
  const handleChangeTabAmount = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTabAmount(event.target.value);
  };
  const handleMaxTabAmount = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (tabOption === "stake")
      setTabAmount(token.stakerData.walletBalance.toString());
    if (tabOption === "unstake")
      setTabAmount(token.stakerData.stakingBalance.toString());
    if (tabOption === "withdraw reward")
      setTabAmount(token.stakerData.rewardBalance.toString());
  };
  const handleClickTabButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (tabOption === "stake") console.log(tabOption);
    if (tabOption === "unstake") console.log(tabOption);
    if (tabOption === "withdraw reward") console.log(tabOption);
  };

  const handleChangeStakingRewardToken = (event: SelectChangeEvent) => {
    console.log(event.target.value);
  };

  return (
    <Stack spacing={2.5}>
      <Box component={Paper}>
        <TabContext value={tabOption}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChangeTabOption}
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="Stake" value="stake" />
              <Tab label="Unstake" value="unstake" />
              <Tab label="Withdraw Reward" value="withdraw reward" />
            </TabList>
          </Box>
          <TabPanel value={tabOption}>
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
              value={tabAmount}
              onChange={handleChangeTabAmount}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button onClick={handleMaxTabAmount}>MAX</Button>
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
                onClick={handleClickTabButton}
              >
                {tabOption}
              </Button>
            )}
          </TabPanel>
        </TabContext>
      </Box>
      <Box component={Paper}>
        <Box px={2.5} py={1.5} sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Typography variant="button">Change Reward Token</Typography>
        </Box>
        <Box p={2.5}>
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
      </Box>
    </Stack>
  );
}

export const TokenRowCollapse = (props: { token: Token; tokens: Token[] }) => {
  const { token, tokens } = props;
  const { account: walletAddress } = useEthers();
  const walletIsConnected = walletAddress !== undefined;

  return (
    <Box sx={{ margin: 1 }}>
      <Table size="small" aria-label="staking">
        <TableBody>
          <TableRow>
            <TableCell sx={{ width: { sm: "50%" }, verticalAlign: "top" }}>
              <Stack spacing={2.5}>
                <Box component={Paper}>
                  <Box
                    px={2.5}
                    py={1.5}
                    sx={{ borderBottom: 1, borderColor: "divider" }}
                  >
                    <Typography variant="button">
                      Your {token.name} Balances
                    </Typography>
                  </Box>
                  <Box p={2.5}>
                    <Typography variant="body2">
                      Wallet Balance:{" "}
                      {token.stakerData.walletBalance.toLocaleString("en-us")}{" "}
                      {token.name}
                    </Typography>
                    <Typography variant="body2">
                      Reward Balance:{" "}
                      {token.stakerData.rewardBalance.toLocaleString("en-us")}{" "}
                      {token.name}
                    </Typography>
                    <Typography variant="body2">
                      Staking Balance:{" "}
                      {token.stakerData.stakingBalance.toLocaleString("en-us")}{" "}
                      {token.name}
                    </Typography>
                  </Box>
                </Box>
                <Box display={{ xs: "block", sm: "none" }}>
                  <Actions token={token} tokens={tokens} />
                </Box>
              </Stack>
            </TableCell>
            <TableCell sx={{ width: { sm: "50%" }, verticalAlign: "top" }}>
              <Box display={{ xs: "none", sm: "block" }}>
                <Actions token={token} tokens={tokens} />
              </Box>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
};
