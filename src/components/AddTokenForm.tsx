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
    if (newCategory === "0") setName("");
    if (newCategory === "1")
      setName(
        (name1 !== "" ? name1 : "NAME1") +
          "-" +
          (name2 !== "" ? name2 : "NAME2")
      );
  };

  const [name, setName] = React.useState("");
  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    setName(newName);
  };
  const [name1, setName1] = React.useState("");
  const handleChangeName1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName1 = event.target.value;
    setName1(newName1);
  };
  const [name2, setName2] = React.useState("");
  const handleChangeName2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName2 = event.target.value;
    setName2(newName2);
  };
  useEffect(() => {
    if (category === 1)
      setName(
        (name1 !== "" ? name1 : "NAME1") +
          "-" +
          (name2 !== "" ? name2 : "NAME2")
      );
  }, [name1, name2]);

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
            variant={category !== 0 ? "filled" : undefined}
            disabled={category !== 0}
            fullWidth
            value={name}
            onChange={handleChangeName}
          />
          {category !== 0 ? (
            <Grid container spacing={3} pt="10px">
              <Grid item xs={6}>
                <TextField
                  required
                  label="Name 1"
                  fullWidth
                  value={name1}
                  onChange={handleChangeName1}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  label="Name 2"
                  fullWidth
                  value={name2}
                  onChange={handleChangeName2}
                />
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
