import { Button } from "@mui/material";
import { useEthers } from "@usedapp/core";

export const ConnectWallet = (props: {
  size: "small" | "medium" | "large" | undefined;
}) => {
  const { size } = props;
  const { activateBrowserWallet } = useEthers();
  return (
    <Button
      variant="contained"
      size={size}
      color="secondary"
      onClick={() => activateBrowserWallet()}
    >
      Connect Wallet
    </Button>
  );
};
