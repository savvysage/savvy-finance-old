import React from 'react';
import {
  DAppProvider,
  BSC,
  BSCTestnet,
} from '@usedapp/core';
import { Container, Stack } from '@mui/material';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import { Header } from './components/Header';
import { Main } from './components/Main';

function App() {
  return (
    <DAppProvider config={{
      networks: [BSC, BSCTestnet]
    }}>
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
