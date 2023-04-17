import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LinkBehavior from '../../components/LinkBehavior';

const PaymentMethodButton = ({
    icon,
    title,
    disabled,
    to
}) => (
    <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textDecoration: 'none'
    }} component={LinkBehavior} to={to}>
        <IconButton disabled={disabled}>
            <img src={icon} />
        </IconButton>
        <Typography variant="body2" fontWeight={500} color="text.secondary">
            {title}
        </Typography>
    </Box>
)

export default PaymentMethodButton
