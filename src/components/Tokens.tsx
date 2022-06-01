import * as React from "react";
import { useEthers, useTokenBalance } from "@usedapp/core";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Collapse,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  styled,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Token } from "./Main";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { formatEther } from "ethers/lib/utils";
import { ConnectWallet } from "./ConnectWallet";
import { constants } from "ethers";

function TokenInnerRow(props: { token: Token; tokens: Token[] }) {
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
    <React.Fragment>
      <TableRow>
        <TableCell width={"50%"}>
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
                  Your {token.name} Wallet Balance:{" "}
                  {token.stakerData.walletBalance.toLocaleString("en-us")}
                </Typography>
                <Typography variant="body2">
                  Your {token.name} Staking Balance:{" "}
                  {token.stakerData.stakingBalance.toLocaleString("en-us")}
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
                        <Button onClick={handleStakingAmountMax}>MAX</Button>
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
        </TableCell>
        <TableCell width={"50%"}>
          <Box>
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
          </Box>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function TokenRow(props: { token: Token; tokens: Token[] }) {
  const { token, tokens } = props;
  const [open, setOpen] = React.useState(false);
  const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
  }));

  return (
    <React.Fragment>
      <TableRow
        sx={{
          "& > *": { borderBottom: "unset" },
          verticalAlign: "top",
        }}
        onClick={() => setOpen(!open)}
      >
        <TableCell component="th" scope="row">
          <Stack direction="row" alignItems="center" spacing={1}>
            {token.type === 0 ? (
              <Avatar alt={token.name + " Icon"} src={token.icon[0]} />
            ) : (
              <Badge
                overlap="circular"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                badgeContent={
                  <SmallAvatar alt={token.name + " Icon"} src={token.icon[1]} />
                }
              >
                <Avatar alt={token.name + " Icon"} src={token.icon[0]} />
              </Badge>
            )}
            <Box>
              <Typography variant="h6">Stake {token.name}</Typography>
              <Typography variant="caption">
                Earn {token.name} & more.
              </Typography>
            </Box>
          </Stack>
        </TableCell>
        <TableCell align="right">
          <Typography variant="subtitle2">Total Staked</Typography>
          <Typography>
            {token.stakingBalance.toLocaleString("en-us")}
          </Typography>
          <Typography variant="body2">
            {(token.price * token.stakingBalance).toLocaleString("en-us")} USD
          </Typography>
        </TableCell>
        <TableCell align="right">
          <Typography variant="subtitle2">Your Stake</Typography>
          <Typography>
            {token.stakerData.stakingBalance.toLocaleString("en-us")}
          </Typography>
          <Typography variant="body2">
            {(token.price * token.stakerData.stakingBalance).toLocaleString(
              "en-us"
            )}{" "}
            USD
          </Typography>
        </TableCell>
        <TableCell align="right">
          <Typography variant="subtitle2">APR</Typography>
          <Typography>{token.stakingApr.toLocaleString("en-us")}%</Typography>
        </TableCell>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="staking">
                <TableBody>
                  <TokenInnerRow token={token} tokens={tokens} />
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export const TokensTable = (props: { tokens: Token[] }) => {
  const { tokens } = props;
  return (
    <Box mx={{ md: "7.5%" }}>
      <TableContainer component={Paper}>
        <Table aria-label="tokens table">
          <TableBody>
            {tokens.map((token) => (
              <TokenRow key={token.name} token={token} tokens={tokens} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
