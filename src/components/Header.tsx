import { Box } from "@mui/system";
import { Typography } from "@mui/material";

export const Header = () => {
  return (
    <Box
      sx={{
        background:
          "linear-gradient(139.73deg, rgb(229, 253, 255) 0%, rgb(243, 239, 255) 100%)",
        my: { xs: "5%", md: "3.75%", xl: "2.5%" },
        px: "7.5%",
        py: "2.5%",
        borderRadius: 10,
      }}
    >
      <Typography
        variant="h2"
        component="h1"
        sx={{ color: "primary.main", fontWeight: "bold" }}
      >
        Staking
      </Typography>
      <Typography
        variant="h6"
        component="h2"
        sx={{ color: "secondary.main", fontWeight: "bold" }}
      >
        Stake Tokens / LP Tokens. <br /> Earn rewards in any token.
      </Typography>
    </Box>
  );
};
