import { useEthers } from '@usedapp/core';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';

export const Header = () => {
    const { account, activateBrowserWallet, deactivate } = useEthers()
    const isConnected = account !== undefined

    return (
        // <Box sx={{
        //     p: 4,
        //     display: 'flex',
        //     justifyContent: 'flex-end',
        //     gap: 1
        // }}>
        //     {isConnected ? (
        //         <Button variant="outlined" onClick={deactivate}>Disconnect</Button>
        //     ) : (
        //         <Button variant="contained" onClick={() => activateBrowserWallet()}>Connect</Button>
        //     )}
        // </Box>
        <Box sx={{ background: 'linear-gradient(139.73deg, rgb(229, 253, 255) 0%, rgb(243, 239, 255) 100%)', my: 5, p: 5, borderRadius: 10 }}>
            <Typography variant="h2" component="h1" sx={{ color: 'primary.main', fontWeight: 'bold' }}>Staking</Typography>
            <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>Stake Tokens / LP Tokens and earn rewards in any token of your choice.</Typography>
        </Box>
    )
}