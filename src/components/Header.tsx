import { useEthers } from '@usedapp/core';
import { Box } from '@mui/system';
import { Button } from '@mui/material';
import './Header.css';

export const Header = () => {
    const { account, activateBrowserWallet, deactivate } = useEthers()

    const isConnected = account !== undefined

    return (
        <Box sx={{
            p: 4,
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 1
        }}>
            {isConnected ? (
                <Button variant="outlined" onClick={deactivate}>Disconnect</Button>
            ) : (
                <Button variant="contained" onClick={() => activateBrowserWallet()}>Connect</Button>
            )}
        </Box>
    )
}