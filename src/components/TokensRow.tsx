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
import { StakingTable } from "./StakingTable";

export const TokensRow = (props: { token: Token; tokens: Token[] }) => {
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
              <Typography variant="button" fontSize={{ sm: "1.1rem" }}>
                Stake {token.type !== 1 ? token.name : token.name + " LP"}
              </Typography>
              <Typography
                variant="caption"
                display={{ xs: "block", sm: "block" }}
              >
                Earn {token.name} & more.
              </Typography>
            </Box>
          </Stack>
          <Typography
            variant="caption"
            align="justify"
            display={{ xs: "none", sm: "none" }}
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
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <StakingTable token={token} tokens={tokens} />
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};
