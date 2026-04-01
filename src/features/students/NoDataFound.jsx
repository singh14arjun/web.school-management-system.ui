import { Box, Typography } from "@mui/material";

const NoDataFound = () => {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            <Typography variant="h6">No Students Found</Typography>
        </Box>
    );
};

export default NoDataFound;