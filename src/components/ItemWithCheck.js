import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import { CheckCircle2 } from 'lucide-react';

const ItemWithCheck = ({ children, color = '#FFD900' }) => (
    <Box sx={{
        display: 'flex',
        alignItems: 'start',
        lineHeight: '28px',
        fontWeight: 400
    }}>
        <Box mr={1} color={color}>
            <CheckCircle2
                size={18}
                color={color}
            />
        </Box>
        <Typography
            variant="subtitle1"
            textAlign='left'
            gutterBottom
            fontSize='15px'
        >
            {children}
        </Typography>
    </Box>
)

export default ItemWithCheck
