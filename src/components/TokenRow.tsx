import React from "react";
import { useEthers, useTokenBalance } from "@usedapp/core";
import { formatEther } from "ethers/lib/utils";
import { Box } from "@mui/system";
import {
  Avatar,
  Badge,
  Collapse,
  IconButton,
  Stack,
  styled,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Token } from "./Main";
import { TokenRowCollapse } from "./TokenRowCollapse";
import { getContractAddress, numberFormatter } from "../common";
import { useTokensPrices } from "../hooks/savvy_finance_farm";

export const TokenRow = (props: {
  tokenIndex: number;
  tokens: Token[];
  tokensAreUpdated: boolean;
}) => {
  const { tokenIndex, tokens, tokensAreUpdated } = props;
  const { account: walletAddress } = useEthers();
  // const walletIsConnected = walletAddress !== undefined;

  // tokens[tokenIndex].price = useTokensPrices([
  //   getContractAddress(
  //     tokens[tokenIndex].name.toLowerCase() + "_token",
  //     "bsc-main"
  //   ),
  // ])[0];
  tokens[tokenIndex].stakerData.walletBalance = parseFloat(
    formatEther(useTokenBalance(tokens[tokenIndex].address, walletAddress) ?? 0)
  );

  const token = tokens[tokenIndex];

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
        <TableCell width={1}>
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
            {token.category === 0 ? (
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
              <Typography variant="button" fontSize={{ sm: "1.1rem" }}>
                Stake {token.category !== 1 ? token.name : token.name + " LP"}
              </Typography>
              <Typography
                variant="caption"
                display={{ xs: "none", sm: "block" }}
              >
                Earn {token.category !== 1 ? token.name : token.name + " LP"} &
                more.
              </Typography>
            </Box>
          </Stack>
          <Typography
            variant="caption"
            align="justify"
            ml={1}
            display={{ xs: "block", sm: "none" }}
          >
            Earn {token.category !== 1 ? token.name : token.name + " LP"} &
            more.
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="subtitle2">APR</Typography>
          <Typography>{token.stakingApr}%</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="subtitle2">Total Staked</Typography>
          <Typography noWrap>
            {numberFormatter.format(token.stakingBalance)}{" "}
            {token.category !== 1 ? token.name : token.name + " LP"}
          </Typography>
          <Typography variant="body2" noWrap>
            {numberFormatter.format(token.price * token.stakingBalance)} USD
          </Typography>
        </TableCell>
        <TableCell>
          <Box display={{ xs: "none", sm: "block" }}>
            <Typography variant="subtitle2">You Staked</Typography>
            <Typography noWrap>
              {numberFormatter.format(token.stakerData.stakingBalance)}{" "}
              {token.category !== 1 ? token.name : token.name + " LP"}
            </Typography>
            <Typography variant="body2" noWrap>
              {numberFormatter.format(
                token.price * token.stakerData.stakingBalance
              )}{" "}
              USD
            </Typography>
          </Box>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <TokenRowCollapse
              tokenIndex={tokenIndex}
              tokens={tokens}
              tokensAreUpdated={tokensAreUpdated}
            />
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};
