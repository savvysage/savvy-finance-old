import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

export const AddTokenForm = () => {
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
            id="address"
            name="address"
            label="Address"
            fullWidth
            autoComplete="address"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="name"
            name="name"
            label="Name"
            fullWidth
            autoComplete="name"
            variant="standard"
            disabled={category !== 0}
          />
          {category !== 0 ? (
            <Grid container spacing={3} pt="10px">
              <Grid item xs={6}>
                <TextField
                  id="name1"
                  name="name1"
                  label="Name1"
                  autoComplete="name1"
                  fullWidth
                  variant="standard"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="name2"
                  name="name2"
                  label="Name2"
                  autoComplete="name2"
                  fullWidth
                  variant="standard"
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
            fullWidth
            autoComplete="staking apr"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="rewardToken"
            name="rewardToken"
            label="Reward Token"
            fullWidth
            autoComplete="reward token"
            variant="standard"
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
