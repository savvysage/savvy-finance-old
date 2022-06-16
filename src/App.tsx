import React from "react";
import { DAppProvider, BSC, BSCTestnet } from "@usedapp/core";
import { getDefaultProvider } from "ethers";
import { Box } from "@mui/system";
import { Container, CssBaseline, Stack } from "@mui/material";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { Footer } from "./components/Footer";

function App() {
  return (
    <DAppProvider
      config={{
        networks: [BSC, BSCTestnet],
        readOnlyChainId: BSCTestnet.chainId,
        readOnlyUrls: {
          [BSC.chainId]: getDefaultProvider(
            "https://bsc-dataseed.binance.org/"
          ),
          [BSCTestnet.chainId]: getDefaultProvider(
            "https://data-seed-prebsc-1-s3.binance.org:8545/"
          ),
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <CssBaseline />
        <ResponsiveAppBar />
        <Container
          component="main"
          sx={{ my: { xs: "5%", md: "3.75%", xl: "2.5%" } }}
          maxWidth="xl"
        >
          <Stack spacing={2}>
            <Header />
            <Main />
          </Stack>
        </Container>
        <Footer />
      </Box>
    </DAppProvider>
  );
}

export default App;
