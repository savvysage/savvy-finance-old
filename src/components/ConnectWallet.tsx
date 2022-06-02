import { useEthers } from "@usedapp/core";
import { Button } from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

export const ConnectWallet = (props: {
  size?: "small" | "medium" | "large" | undefined;
}) => {
  const { size } = props;
  const { activateBrowserWallet } = useEthers();
  return (
    <Button
      variant="contained"
      size={size ?? "medium"}
      color="secondary"
      onClick={() => activateBrowserWallet()}
    >
      <AccountBalanceWalletIcon /> Connect
    </Button>
  );
};
