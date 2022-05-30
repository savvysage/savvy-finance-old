import React from "react";
import { DAppProvider, BSC, BSCTestnet } from "@usedapp/core";
import { Container, Stack } from "@mui/material";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { getDefaultProvider } from "ethers";

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
            "https://data-seed-prebsc-1-s1.binance.org:8545/"
          ),
        },
      }}
    >
      <ResponsiveAppBar />
      <Container maxWidth="xl">
        <Stack spacing={2}>
          <Header />
          <Main />
        </Stack>
      </Container>
    </DAppProvider>
  );
}

export default App;
