import * as React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import { MessageSquare } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale'
import getUserPhoto from '../../utils/getUserPhoto';
import LinkBehavior from '../../components/LinkBehavior';
import Skeleton from "@mui/material/Skeleton";
import FeaturedMark from './FeaturedMark';
import LikePostButton from '../../components/Buttons/LikePostButton';

const Status = ({ status }) => {
    const [label, setLabel] = React.useState(null)

    const updateLabel = async () => {
        switch(status) {
            case 'pending':
            case 'updated': {
                return await setLabel({
                    color: 'info.main',
                    label: 'Pendiente'
                })
            }
            case 'active': {
                return await setLabel({
                    color: 'success.main',
                    label: 'Publicado'
                })
            }
            case 'blocked': {
                return await setLabel({
                    color: 'error.main',
                    label: 'Bloqueado'
                })
            }
            case 'refused': {
                return await setLabel({
                    color: 'error.main',
                    label: 'Rechazado'
                })
            }
            default: {
                return;
            }
        }
    }

    React.useEffect(() => { updateLabel()})

    if (!label) return <></>;

    return (
        <Typography
            variant="body1"
            color={label.color}
            fontWeight={500}
            fontSize={12}
        >
            {label.label}
        </Typography>
    )
}

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
                '&: hover': {
                    opacity: 0.75
                }
            }}>
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
                                cursor: 'pointer',
                                maxWidth: '130px',
                                maxHeight: '130px'
                            }}
                            to={`/blogs/${item.id}`} component={LinkBehavior}
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
                        <Box to={`/blogs/${item.id}`} component={LinkBehavior} sx={{
                            textDecoration: 'none',
                            color: 'unset'
                        }}>
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
                            {(showStatus) && <Status {...item } />}
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
                            <LikePostButton
                                id={item.id}
                                type="post"
                                LikesBlog={item.LikesBlog}
                                LikesCount={item.LikesCount}
                            />
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
