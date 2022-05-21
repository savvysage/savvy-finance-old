import { Accordion, AccordionDetails, AccordionSummary, Avatar, Box, Divider, Stack, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Token } from "./Main"

interface YourWalletProps {
    supportedTokens: Array<Token>
}

export const Tokens = ({ supportedTokens }: YourWalletProps) => {
    return (
        <Box mx={{ lg: '7.5%' }}>
            {supportedTokens.map((supportedToken, key) => (
                <Accordion key={key}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={"panel" + key + "a-content"}
                        id={"panel" + key + "a-header"}
                    >
                        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={{ xs: 2.5, sm: 7.5, md: 15, lg: 25 }}>
                            <Box>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <Avatar alt={supportedToken["name"] + "-icon"} src={supportedToken["image"]} />
                                    <Box>
                                        <Typography variant="h6">Stake {supportedToken["name"]}</Typography>
                                        <Typography variant="caption">Earn Multi Tokens</Typography>
                                    </Box>
                                </Stack>
                            </Box>
                            <Box>
                                <Typography variant="subtitle2">Total {supportedToken["name"]} Staked</Typography>
                                <Typography>0.0</Typography>
                                <Typography variant="body2">0 USD</Typography>
                            </Box>
                            <Box>
                                <Typography variant="subtitle2">Your {supportedToken["name"]} Staked</Typography>
                                <Typography>0.0</Typography>
                                <Typography variant="body2">0 USD</Typography>
                            </Box>
                            <Box>
                                <Typography variant="subtitle2">APR</Typography>
                                <Typography>0%</Typography>
                            </Box>
                        </Stack>
                    </AccordionSummary>
                    <Divider />
                    <AccordionDetails>
                        <Typography>
                            Loading...
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Box>
    );
}
