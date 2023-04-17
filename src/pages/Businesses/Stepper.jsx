import { useLocation } from "react-router-dom";
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import styled from "@emotion/styled";
import { alpha } from "@mui/material";

const Indicator = styled(Box)(({ theme, active }) => ({
    backgroundColor: active
        ? theme.palette.primary.main
        : `${alpha(theme.palette.primary.main, 0.5)}`,
    border: '0 !important',
    height: '10px',
    width: '10px',
    borderRadius: '50px'
}));

const Stepper = ({
    title,
    type = 'create'
}) => {
    const location = useLocation();

    const getLinkClass = path => path === location.pathname;

    return (
        <Box sx={{
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <Typography
                variant="subtitle1"
                color="text.secondary"
                fontWeight={500}
            >
                {title}
            </Typography>
            <Stack spacing={3} direction="row">
                <Indicator active={getLinkClass(`/businesses/${type}`)} />
                <Indicator active={getLinkClass(`/businesses/${type}/step-2`)} />
                <Indicator active={getLinkClass(`/businesses/${type}/step-3`)} />
            </Stack>
        </Box>
    );
};

export default Stepper
