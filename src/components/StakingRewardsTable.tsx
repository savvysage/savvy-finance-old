import moment from "moment";
import { useEthers } from "@usedapp/core";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Token } from "./Main";
import { numberFormatter } from "../common";

export const StakingRewardsTable = (props: {
  token: Token;
  tokens: Token[];
}) => {
  const { token, tokens } = props;
  const { account: walletAddress } = useEthers();
  const walletIsConnected = walletAddress !== undefined;

  return (
    <TableContainer component={Paper} sx={{ maxHeight: "25rem" }}>
      <Table size="small" aria-label="staking rewards table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Reward Value</TableCell>
            <TableCell align="right">Staking Value</TableCell>
            <TableCell align="right">Staking APR</TableCell>
            <TableCell align="right">Staking Duration</TableCell>
            <TableCell align="right">Triggered By</TableCell>
            <TableCell align="right">Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {token.stakerData.stakingRewards
            .slice()
            .reverse()
            .map((stakingReward) => (
              <TableRow
                key={stakingReward.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Typography noWrap>{stakingReward.id}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography noWrap>
                    {numberFormatter.format(stakingReward.rewardTokenAmount)}{" "}
                    {token.name}
                  </Typography>
                  <Typography variant="body2" noWrap>
                    {numberFormatter.format(
                      stakingReward.rewardTokenPrice *
                        stakingReward.rewardTokenAmount
                    )}{" "}
                    USD
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography noWrap>
                    {numberFormatter.format(stakingReward.stakedTokenAmount)}{" "}
                    {token.name}
                  </Typography>
                  <Typography variant="body2" noWrap>
                    {numberFormatter.format(
                      stakingReward.stakedTokenPrice *
                        stakingReward.stakedTokenAmount
                    )}{" "}
                    USD
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography noWrap>{stakingReward.stakingApr}%</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography noWrap>
                    {stakingReward.stakingDurationInSeconds}secs
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography noWrap>
                    {stakingReward.triggeredBy[0]}{" "}
                    {stakingReward.triggeredBy[1]}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography noWrap>
                    {moment(
                      new Date(stakingReward.timestampAdded * 1000)
                    ).fromNow()}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
