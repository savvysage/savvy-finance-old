import React from "react";
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

export const TokenRow = (props: { token: Token; tokens: Token[] }) => {
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
        <TableCell align="right">
          <Typography variant="subtitle2">APR</Typography>
          <Typography>{token.stakingApr.toLocaleString("en-us")}%</Typography>
        </TableCell>
        <TableCell align="right">
          <Typography variant="subtitle2">Total Staked</Typography>
          <Typography noWrap>
            {token.stakingBalance.toLocaleString("en-us")}{" "}
            {token.category !== 1 ? token.name : token.name + " LP"}
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
              {token.category !== 1 ? token.name : token.name + " LP"}
            </Typography>
            <Typography variant="body2" noWrap>
              {(token.price * token.stakerData.stakingBalance).toLocaleString(
                "en-us"
              )}{" "}
              USD
            </Typography>
          </Box>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <TokenRowCollapse token={token} tokens={tokens} />
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};
