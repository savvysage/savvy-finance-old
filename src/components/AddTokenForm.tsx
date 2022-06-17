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

  return (
    <React.Fragment>
      {/* <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography> */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="address"
            name="address"
            label="Address"
            autoComplete="address"
            fullWidth
          />
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
            id="name"
            name="name"
            label="Name"
            autoComplete="name"
            disabled={category !== 0}
            fullWidth
          />
          {category !== 0 ? (
            <Grid container spacing={3} pt="10px">
              <Grid item xs={6}>
                <TextField
                  required
                  id="name1"
                  name="name1"
                  label="Name 1"
                  autoComplete="name1"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  id="name2"
                  name="name2"
                  label="Name 2"
                  autoComplete="name2"
                  fullWidth
                />
              </Grid>
            </Grid>
          ) : null}
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="stakingApr"
            name="stakingApr"
            label="Staking APR"
            autoComplete="staking apr"
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
              defaultValue="default"
              // onChange={handleChangeStakingRewardToken}
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
        <Grid item xs={12}>
          <TextField
            required
            id="adminStakeFee"
            name="adminStakeFee"
            label="Admin Stake Fee"
            autoComplete="admin stake fee"
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="adminUnstakeFee"
            name="adminUnstakeFee"
            label="Admin Unstake Fee"
            autoComplete="admin unstake fee"
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
