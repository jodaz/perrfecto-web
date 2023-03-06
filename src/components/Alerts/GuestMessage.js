import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import LinkBehavior from "../LinkBehavior"

const GuestMessage = ({
    title,
    subtitle,
    Image
}) => (
    <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        height: '100%',
        flexDirection: 'column',
        paddingRight: '1rem',
        paddingLeft: '1rem',
        textAlign: 'center',
        alignItems: 'center'
    }}>
        <Box
            component="img"
            height='170px'
            width='145px'
            src={Image}
            marginBottom='15px'
        />
        <Typography
            color="text.primary"
            variant="subtitle1"
            fontWeight={500}
            gutterBottom
        >
            {title}
        </Typography>
        <Typography
            color="text.secondary"
            variant="subtitle1"
            gutterBottom
        >
            {subtitle}
        </Typography>
        <Box p={2}>
            <Button
                variant="contained"
                component={LinkBehavior}
                to='/login'
            >
                Iniciar sesión
            </Button>
        </Box>
    </Box>
)

export default GuestMessage;
