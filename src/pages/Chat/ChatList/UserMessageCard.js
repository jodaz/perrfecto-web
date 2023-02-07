import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from "@mui/material/Skeleton";
import { alpha } from '@mui/material';
import Badge from '@mui/material/Badge';
import getUserPhoto from '../../../utils/getUserPhoto';
import truncateString from '../../../utils/truncateString';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';
import { es } from 'date-fns/locale'

const Picture = data => (
    <Avatar
        src={`${data.User.user_picture}`}
        sx={{
            height: '50px',
            width: '50px'
        }}
    />
)

const UserMessageCard = ({
    rootRef,
    data,
    index
}) => {
    const [datetime, setDatetime] = React.useState(null)
    const loading = data == null;
    const anchorRef = React.useRef(null)

    React.useEffect(() => {
        if (!loading) {
            const interval = setInterval(() => {
                setDatetime(
                    formatDistanceToNowStrict(data.created_at, {
                        locale: es,
                    }).slice(0, 12)
                )
            }, 5000);

            return () => {
                clearInterval(interval);
            };
        }
    }, [])

    return (
        <Box
            ref={rootRef}
            key={index}
            sx={{
                textDecoration: 'none',
                color: 'unset'
            }}
        >
            <Box sx={{
                // height: '3rem',
                cursor: 'pointer',
                display: 'flex',
                padding: '0 0.5rem',
                borderRadius: '6px',
                alignItems: 'start',
                transition: '0.1s',
                p: 1,
                '&:hover': {
                    backgroundColor: theme => `${alpha(theme.palette.divider, 0.7)}`
                }
            }} ref={anchorRef}>
                <Box marginRight='1rem'>
                    {loading ? (
                        <Skeleton
                            animation="wave"
                            variant="circular"
                            width={40}
                            height={40}
                        />
                    ) : (
                        <Box>
                            {/* <Avatar src={`${getUserPhoto(photo)}`} /> */}
                            {data.connected
                            ? (
                                <Badge
                                    badgeContent=''
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right'
                                    }}
                                    sx={{
                                        '& .MuiBadge-badge': {
                                            height: '16px',
                                            width: '16px',
                                            borderRadius: '100px',
                                            border: '2px solid #fff'
                                        }
                                    }}
                                    color={'success'}
                                    variant="dot"
                                    overlap="circular"
                                >
                                    <Picture {...data} />
                                </Badge>
                            ): (
                                <Picture {...data} />
                            )}
                        </Box>
                    )}
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1
                }}>
                    {loading ? (
                        <Skeleton
                            animation="wave"
                            height={10}
                            width="80%"
                            style={{ marginBottom: 6 }}
                        />
                    ) : (
                        <Typography variant="subtitle1" fontWeight={500}>
                            {truncateString(`${data.User.name} ${data.User.lastName ? data.User.lastName : ''}`, 12 )}
                        </Typography>
                    )}
                    {loading ? (
                        <Skeleton
                            animation="wave"
                            height={10}
                            width="40%"
                            style={{ marginBottom: 6 }}
                        />
                    ) : (
                        <Typography variant="body2" color="text.tertiary" fontWeight={500}>
                            {truncateString(data.message, 20)}
                        </Typography>
                    )}
                </Box>
                {!!!loading && (
                    <Box>
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
                    </Box>
                )}
            </Box>
        </Box>
    );
}

export default UserMessageCard
