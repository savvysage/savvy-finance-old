import * as React from "react";
import { useEthers, useTokenBalance } from "@usedapp/core";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Collapse,
  IconButton,
  InputAdornment,
  Paper,
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

function InnerRow(props: { token: Token }) {
  const { token } = props;
  const { account, activateBrowserWallet } = useEthers();
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

  return (
    <React.Fragment>
      <TableRow>
        <TableCell
          sx={
            {
              /*border: 1, borderColor: 'grey.500', borderRadius: 1*/
            }
          }
        >
          <Box sx={{ width: "100%", typography: "body1" }}>
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
                {!isConnected ? (
                  <Button
                    variant="contained"
                    size="large"
                    color="secondary"
                    onClick={() => activateBrowserWallet()}
                  >
                    Connect Wallet
                  </Button>
                ) : (
                  <>
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
                            <Button onClick={handleStakingAmountMax}>
                              MAX
                            </Button>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <br />
                    <Button variant="contained" size="large" color="secondary">
                      {stakingOption}
                    </Button>
                  </>
                )}
              </TabPanel>
            </TabContext>
          </Box>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function Row(props: { token: Token }) {
  const { token } = props;
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
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
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
              <Typography variant="caption">Choose Reward Token</Typography>
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
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="staking">
                <TableBody>
                  <InnerRow token={token} />
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

interface TokensProps {
  tokens: Token[];
}

export const TokensTable = ({ tokens }: TokensProps) => {
  return (
    <Box mx={{ md: "7.5%" }}>
      <TableContainer component={Paper}>
        <Table aria-label="tokens table">
          <TableBody>
            {tokens.map((token) => (
              <Row key={token.name} token={token} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
