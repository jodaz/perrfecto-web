import * as React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import { ThumbsUp, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale'
import getUserPhoto from '../../utils/getUserPhoto';
import LinkBehavior from '../../components/LinkBehavior';

const PostCard = ({
    id,
    title,
    BlogMultimedia,
    createdAt,
    commentsCount,
    likesCount
}) => (
    <Card
        variant="outlined"
        sx={{
            display: 'flex',
            border: 'none',
            textDecoration: 'none',
            color: 'unset',
            flexDirection: { xs: 'column', sm: 'row' },
            transition: '0.3s',
            cursor: 'pointer',
            '&: hover': {
                opacity: 0.75
            }
        }}
        component={LinkBehavior}
        to={`/blogs/${id}`}
    >
        <CardMedia
            component="img"
            width="130px"
            height="140px"
            alt="post_cover"
            src={BlogMultimedia.length ? getUserPhoto(BlogMultimedia[0].name) : null}
            sx={{
                borderRadius: 2,
                minWidth: '130px',
                minHeight: '130px',
                maxWidth: '130px',
                maxHeight: '130px'
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
                    {format(new Date(createdAt), 'MMMM d, y', { locale: es })}
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

export default PostCard
