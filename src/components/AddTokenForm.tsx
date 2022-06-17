import React, { useEffect } from "react";
import { useEthers } from "@usedapp/core";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Token } from "./Main";

export const AddTokenForm = (props: {
  tokens: Token[];
  tokensAreUpdated: boolean;
}) => {
  const { tokens, tokensAreUpdated } = props;
  const { account: walletAddress } = useEthers();
  // const walletIsConnected = walletAddress !== undefined;

  const [address, setAddress] = React.useState("");
  const handleChangeAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  const [category, setCategory] = React.useState(0);
  const handleChangeCategory = (event: SelectChangeEvent) => {
    const newCategory = event.target.value;
    setCategory(parseInt(newCategory));
  };

  const [rewardToken, setRewardToken] = React.useState("default");
  const handleChangeRewardToken = (event: SelectChangeEvent) => {
    const newRewardToken = event.target.value;
    setRewardToken(newRewardToken);
  };

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField required label="Address" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              label="Category"
              value={category.toString()}
              onChange={handleChangeCategory}
            >
              <MenuItem value="0">DEFAULT</MenuItem>
              <MenuItem value="1">LP</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            label="Name"
            defaultValue={category !== 0 ? "NAME1-NAME2" : undefined}
            variant={category !== 0 ? "filled" : undefined}
            disabled={category !== 0}
            fullWidth
          />
          {category !== 0 ? (
            <Grid container spacing={3} pt="10px">
              <Grid item xs={6}>
                <TextField required label="Name 1" fullWidth />
              </Grid>
              <Grid item xs={6}>
                <TextField required label="Name 2" fullWidth />
              </Grid>
            </Grid>
          ) : null}
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            type="number"
            label="Staking APR"
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Reward Token</InputLabel>
            <Select
              label="Reward Token"
              value={rewardToken}
              onChange={handleChangeRewardToken}
            >
              <MenuItem value="default">SAME AS TOKEN</MenuItem>
              {tokens.map((token) =>
                token.admin === walletAddress ? (
                  <MenuItem key={token.name} value={token.address}>
                    {token.name}
                  </MenuItem>
                ) : null
              )}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            type="number"
            label="Stake Fee (Admin)"
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            type="number"
            label="Unstake Fee (Admin)"
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
            fullWidth
          />
        </Grid>
        {/* <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox color="secondary" name="saveAddress" value="yes" />
            }
            label="Use this address for payment details"
          />
        </Grid> */}
      </Grid>
    </React.Fragment>
  );
};
