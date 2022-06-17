import * as React from "react";
import { useEthers } from "@usedapp/core";
import { Box, IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from "@mui/icons-material/Close";
import { AddTokenForm } from "./AddTokenForm";
import { Token } from "./Main";
import { ConnectWallet } from "./ConnectWallet";

export const AddToken = (props: {
  tokens: Token[];
  tokensAreUpdated: boolean;
}) => {
  const { tokens, tokensAreUpdated } = props;
  const { account: walletAddress } = useEthers();
  const walletIsConnected = walletAddress !== undefined;

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box textAlign="right" my="1%">
      <Button variant="contained" onClick={handleClickOpen}>
        <AddCircleIcon />
        &nbsp; Add Token
      </Button>
      <Dialog open={open}>
        <DialogTitle>
          Add Token
          <IconButton
            aria-label="close add token"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText> */}
          <AddTokenForm tokens={tokens} tokensAreUpdated={tokensAreUpdated} />
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Cancel</Button> */}
          {!walletIsConnected ? (
            <ConnectWallet />
          ) : (
            <Button variant="contained" size="large" onClick={handleClose}>
              Add
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};
