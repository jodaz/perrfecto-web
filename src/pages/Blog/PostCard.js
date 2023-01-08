import * as React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import { ThumbsUp, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale'

const PostCard = ({
    title,
    image,
    published_at,
    commentsCount,
    likesCount
}) => {
    return (
        <Card
            variant="outlined"
            sx={{
                display: 'flex',
                border: 'none',
                flexDirection: { xs: 'column', sm: 'row' },
                transition: '0.3s',
                cursor: 'pointer',
                '&: hover': {
                    opacity: 0.75
                }
            }}
        >
            <CardMedia
                component="img"
                width="130"
                height="140"
                alt="Beside Myself album cover"
                src={image}
                sx={{
                    borderRadius: 2,
                }}
            />
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                px: { xs: 0, sm: 2 }
            }}>
                <Box>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        fontWeight={700}
                        sx={{
                            textAlign: { xs: 'center', sm: 'start' },
                            mt: { xs: 1.5, sm: 0 },
                        }}
                    >
                        {title}
                    </Typography>
                    <Typography
                        component="div"
                        variant="caption"
                        color="text.tertiary"
                        fontWeight={500}
                        sx={{ textAlign: { xm: 'center', sm: 'start' }, textTransform: 'capitalize' }}
                    >
                        {format(published_at, 'MMMM d, y', { locale: es })}
                    </Typography>
                </Box>
                <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                        justifyContent: { xs: 'space-between', sm: 'flex-start' },
                        alignItems: 'center'
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <ThumbsUp color="#5E5E5E" />
                        <Typography variant="body2" ml={1} color="#5E5E5E">
                            {likesCount}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <MessageSquare color="#5E5E5E" />
                        <Typography variant="body2" ml={1} color="#5E5E5E">
                            {commentsCount}
                        </Typography>
                    </Box>
                </Stack>
            </Box>
        </Card>
    );
}

export default PostCard
