import React from "react";
import { useEthers, useTokenBalance } from "@usedapp/core";
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

function StakerStakingInfo(props: { token: Token; tokens: Token[] }) {
  const { token, tokens } = props;
  return (
    <FormControl fullWidth>
      <InputLabel>Reward Token</InputLabel>
      <Select
        label="Reward Token"
        defaultValue={
          token.stakerData.stakingRewardToken !== constants.AddressZero
            ? token.stakerData.stakingRewardToken
            : token.rewardToken
        }
        // onChange={handleChange}
      >
        {tokens.map((token) => (
          <MenuItem key={token.name} value={token.address}>
            {token.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export function StakingTable(props: { token: Token; tokens: Token[] }) {
  const { token, tokens } = props;
  const { account } = useEthers();
  const isConnected = account !== undefined;
  token.stakerData.walletBalance = parseFloat(
    formatEther(useTokenBalance(token.address, account) ?? 0)
  );

  const [stakingOption, setStakingOption] = React.useState("stake");
  const handleStakingOptionChange = (
    event: React.SyntheticEvent,
    newOption: string
  ) => {
    setStakingOption(newOption);
  };

  const [stakingAmount, setStakingAmount] = React.useState("");
  const handleStakingAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStakingAmount(event.target.value);
  };
  const handleStakingAmountMax = (
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
            <TableCell sx={{ width: { sm: "50%" } }}>
              <Box component={Paper}>
                <TabContext value={stakingOption}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList
                      onChange={handleStakingOptionChange}
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
                      {token.stakerData.stakingBalance.toLocaleString("en-us")}{" "}
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
                      onChange={handleStakingAmountChange}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Button onClick={handleStakingAmountMax}>
                              MAX
                            </Button>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <br />
                    {!isConnected ? (
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
              <Box my={5} display={{ xs: "block", sm: "none" }}>
                <StakerStakingInfo token={token} tokens={tokens} />
              </Box>
            </TableCell>
            <TableCell sx={{ width: { sm: "50%" } }}>
              <Box display={{ xs: "none", sm: "block" }}>
                <StakerStakingInfo token={token} tokens={tokens} />
              </Box>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
}
