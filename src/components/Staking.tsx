import * as React from 'react'
import { useEthers, useTokenBalance } from '@usedapp/core'
import { Avatar, Badge, Box, Button, Collapse, IconButton, InputAdornment, Paper, Stack, styled, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, TextField, Typography } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { Token } from "./Main"
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { formatEther } from 'ethers/lib/utils'
import { constants } from 'ethers'

function createData(token: Token) {
    return { token };
}


function InnerRow(props: { row: ReturnType<typeof createData> }) {
    const { row } = props;

    const { account, activateBrowserWallet, deactivate } = useEthers()
    const isConnected = account !== undefined

    const tokenBalance = parseFloat(formatEther(useTokenBalance(row.token.address, account) ?? 0))

    const [stakingOption, setStakingOption] = React.useState("stake");
    const handleStakingOptionChange = (event: React.SyntheticEvent, newOption: string) => {
        setStakingOption(newOption);
    };

    return (
        <React.Fragment>
            <TableRow>
                <TableCell sx={{ /*border: 1, borderColor: 'grey.500', borderRadius: 1*/ }}>
                    <Box sx={{ width: '100%', typography: 'body1' }}>
                        <TabContext value={stakingOption}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={handleStakingOptionChange} aria-label="staking options">
                                    <Tab label="Stake" value="stake" />
                                    <Tab label="Unstake" value="unstake" />
                                </TabList>
                            </Box>
                            <TabPanel value={stakingOption}>
                                {!isConnected ? (
                                    <Button variant="contained" size="large" color="secondary" onClick={
                                        () => activateBrowserWallet()
                                    }>Connect Wallet</Button>
                                ) : (
                                    <>
                                        <Typography variant="body2">Your {row.token.name} Balance: {tokenBalance.toLocaleString('en-us')}</Typography>
                                        <Typography variant="body2">Your {row.token.name} Staking Balance: {row.token.stakingData.balance.toLocaleString('en-us')}</Typography>
                                        <TextField id="amount" label="Amount" type="number" margin="normal" InputProps={{
                                            endAdornment: <InputAdornment position="end"><Button>MAX</Button></InputAdornment>
                                        }} />
                                        <br /><Button variant="contained" size="large" color="secondary">{stakingOption}</Button>
                                    </>
                                )}
                            </TabPanel>
                        </TabContext>
                    </Box>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}


function Row(props: { row: ReturnType<typeof createData> }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const SmallAvatar = styled(Avatar)(({ theme }) => ({
        width: 22,
        height: 22,
        border: `2px solid ${theme.palette.background.paper}`,
    }));

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' }, verticalAlign: 'top' }} onClick={() => setOpen(!open)}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    <Stack direction="row" alignItems="center" spacing={1}>
                        {row.token.type === 0 ? (<Avatar alt={row.token.name + " Icon"} src={row.token.icon[0]} />) : (
                            <Badge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                badgeContent={
                                    <SmallAvatar alt={row.token.name + " Icon"} src={row.token.icon[1]} />
                                }
                            >
                                <Avatar alt={row.token.name + " Icon"} src={row.token.icon[0]} />
                            </Badge>
                        )}
                        <Box>
                            <Typography variant="h6">Stake {row.token.name}</Typography>
                            <Typography variant="caption">Choose Reward Token</Typography>
                        </Box>
                    </Stack>
                </TableCell>
                <TableCell align="right">
                    <Typography variant="subtitle2">Total Staked</Typography>
                    <Typography>{row.token.stakingBalance.toLocaleString('en-us')}</Typography>
                    <Typography variant="body2">
                        {(row.token.price * row.token.stakingBalance).toLocaleString('en-us')} USD
                    </Typography>
                </TableCell>
                <TableCell align="right">
                    <Typography variant="subtitle2">Your Stake</Typography>
                    <Typography>{row.token.stakingData.balance.toLocaleString('en-us')}</Typography>
                    <Typography variant="body2">
                        {(row.token.price * row.token.stakingData.balance).toLocaleString('en-us')} USD
                    </Typography>
                </TableCell>
                <TableCell align="right">
                    <Typography variant="subtitle2">APR</Typography>
                    <Typography>{row.token.stakingApr.toLocaleString('en-us')}%</Typography>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Table size="small" aria-label="staking">
                                <TableBody>
                                    <InnerRow row={row} />
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}


interface StakingProps {
    tokens: Token[]
}

export const StakingTable = ({ tokens }: StakingProps) => {
    const rows = tokens.map(token => createData(token))

    return (
        <Box mx={{ 'md': '7.5%' }}>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    {/* <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Dessert (100g serving)</TableCell>
                        <TableCell align="right">Calories</TableCell>
                        <TableCell align="right">Fat&nbsp;(g)</TableCell>
                        <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                        <TableCell align="right">Protein&nbsp;(g)</TableCell>
                    </TableRow>
                </TableHead> */}
                    <TableBody>
                        {rows.map((row) => (
                            <Row key={row.token.name} row={row} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
