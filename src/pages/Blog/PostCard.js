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
import Skeleton from "@mui/material/Skeleton";
import FeaturedMark from './FeaturedMark';

const PostCard = ({
    menu,
    showStatus,
    item
}) => {
    const loading = item == null;

    return (
        <Card
            variant="outlined"
            sx={{
                display: 'flex',
                border: 'none',
                flexDirection: { xs: 'column', sm: 'row' }
            }}
        >
            <Box sx={{
                display: 'flex',
                textDecoration: 'none',
                color: 'unset',
                flex: 1,
                transition: '0.3s',
                cursor: 'pointer',
                '&: hover': {
                    opacity: 0.75
                }
            }} to={!loading ? `/blogs/${item.id}` : null} component={LinkBehavior}>
                {loading ? (
                    <Skeleton
                        animation="wave"
                        variant="rectangular"
                        width={40}
                        height={40}
                    />
                ) : (
                    <Box position="relative">
                        <CardMedia
                            width="130px"
                            height="140px"
                            alt="post_cover"
                            image={item.BlogMultimedia.length ? getUserPhoto(item.BlogMultimedia[0].name) : null}
                            sx={{
                                borderRadius: 2,
                                minWidth: '130px',
                                minHeight: '130px',
                                maxWidth: '130px',
                                maxHeight: '130px'
                            }}
                        >
                            {item.featured_blog && <FeaturedMark position={{ top: 10, left: 10 }} />}
                        </CardMedia>
                    </Box>
                )}
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    flex: 1,
                    px: { xs: 0, sm: 2 }
                }}>
                    {loading ? (
                        <Skeleton
                            animation="wave"
                            height={10}
                            width="80%"
                            style={{ marginBottom: 6 }}
                        />
                    ) : (
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
                                {item.title}
                            </Typography>
                            <Typography
                                component="div"
                                variant="caption"
                                color="text.tertiary"
                                fontWeight={500}
                                sx={{ textAlign: { xm: 'center', sm: 'start' }, textTransform: 'capitalize' }}
                            >
                                {format(new Date(item.createdAt), 'MMMM d, y', { locale: es })}
                            </Typography>
                            {(showStatus) && (
                                <Typography
                                    variant="body1"
                                    color="success.main"
                                    fontWeight={500}
                                    fontSize={12}
                                >
                                    Publicado
                                </Typography>
                            )}
                        </Box>
                    )}
                    {loading ? (
                        <Skeleton
                            animation="wave"
                            height={10}
                            width="40%"
                            style={{ marginBottom: 6 }}
                        />
                    ) : (
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
                                    {item.LikesCount}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <MessageSquare color="#5E5E5E" />
                                <Typography variant="body2" ml={1} color="#5E5E5E">
                                    {item.CommentsCount}
                                </Typography>
                            </Box>
                        </Stack>
                    )}
                </Box>
            </Box>
            {(menu && !loading) && (
                <>{menu}</>
            )}
        </Card>
    );
}

export default PostCard
