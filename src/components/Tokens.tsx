import * as React from "react";
import { useEthers, useTokenBalance } from "@usedapp/core";
import { constants } from "ethers";
import { formatEther } from "ethers/lib/utils";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Collapse,
  Divider,
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
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Token } from "./Main";
import { ConnectWallet } from "./ConnectWallet";
import { width } from "@mui/system";

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

function StakingTable(props: { token: Token; tokens: Token[] }) {
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
              <Typography
                variant="caption"
                display={{ xs: "none", sm: "block" }}
              >
                Earn {token.name} & more.
              </Typography>
            </Box>
          </Stack>
          <Typography
            variant="caption"
            align="center"
            display={{ xs: "block", sm: "none" }}
          >
            Earn {token.name} & more.
          </Typography>
        </TableCell>
        <TableCell align="right">
          <Typography variant="subtitle2">Total Staked</Typography>
          <Typography noWrap>
            {token.stakingBalance.toLocaleString("en-us")} {token.name}
          </Typography>
          <Typography variant="body2" noWrap>
            {(token.price * token.stakingBalance).toLocaleString("en-us")} USD
          </Typography>
        </TableCell>
        <TableCell align="right">
          <Box display={{ xs: "none", sm: "block" }}>
            <Typography variant="subtitle2">You Staked</Typography>
            <Typography noWrap>
              {token.stakerData.stakingBalance.toLocaleString("en-us")}{" "}
              {token.name}
            </Typography>
            <Typography variant="body2" noWrap>
              {(token.price * token.stakerData.stakingBalance).toLocaleString(
                "en-us"
              )}{" "}
              USD
            </Typography>
          </Box>
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
            <StakingTable token={token} tokens={tokens} />
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

//////////////////////////////////////////////////
interface TokenSort {
  name: string;
  type: number;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
//////////////////////////////////////////////////

export const TokensTable = (props: { tokens: Token[] }) => {
  const { tokens } = props;

  const tokensSort = tokens.map((token) => {
    return { name: token.name, type: token.type };
  });

  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof TokenSort>("type");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof TokenSort
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tokens.length) : 0;

  return (
    <Box component={Paper} mx={{ md: "7.5%" }}>
      <TableContainer component={Paper}>
        <Table aria-label="tokens table" size="small">
          <TableBody>
            {/* {tokens.map((token) => (
              <TokenRow key={token.name} token={token} tokens={tokens} />
            ))} */}
            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
            {stableSort(tokens, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((token) => {
                return (
                  <TokenRow key={token.name} token={token} tokens={tokens} />
                );
              })}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 33 * emptyRows,
                }}
              >
                <TableCell colSpan={5} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={tokensSort.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};
