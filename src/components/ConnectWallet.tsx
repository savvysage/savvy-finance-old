import { Button } from "@mui/material";
import { useEthers } from "@usedapp/core";

export const ConnectWallet = () => {
  const { activateBrowserWallet } = useEthers();
  return (
    <Button
      variant="contained"
      size="large"
      color="secondary"
      onClick={() => activateBrowserWallet()}
    >
      Connect Wallet
    </Button>
  );
};
