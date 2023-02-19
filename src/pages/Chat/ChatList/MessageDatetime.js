import * as React from 'react'
import Typography from '@mui/material/Typography';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';
import { es } from 'date-fns/locale'

const UserMessageCard = ({ receivedAt }) => {
    const [datetime, setDatetime] = React.useState(null)

    const getDistanceInWords = () => formatDistanceToNowStrict(new Date(receivedAt), {
        locale: es,
    }).slice(0, 12)

    React.useEffect(() => {
        setDatetime(getDistanceInWords())

        const interval = setInterval(() => {
            setDatetime(getDistanceInWords())
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, [])

    return (
        <Typography
            color='text.tertiary'
            fontWeight={500}
            fontSize='14px'
            sx={{
                '&:first-letter': {
                    textTransform: 'capitalize'
                }
            }}
        >
            {datetime}
        </Typography>
    );
}

export default UserMessageCard
