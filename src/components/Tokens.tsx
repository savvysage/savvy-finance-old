import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, Stack, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const Tokens = () => {
    return (
        <Box mx={{ lg: '7.5%' }}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={{ xs: 2.5, sm: 7.5, md: 15, lg: 30 }}>
                        <Box>
                            <Typography variant="h6">Stake SVF</Typography>
                            <Typography variant="caption">Earn Multi Tokens</Typography>
                        </Box>
                        <Box>
                            <Typography variant="subtitle2">Your SVF Staked</Typography>
                            <Typography>0.0</Typography>
                            <Typography variant="body2">0 USD</Typography>
                        </Box>
                        <Box>
                            <Typography variant="subtitle2">Total SVF Staked</Typography>
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
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}
