import * as React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import getUserPhoto from '../../utils/getUserPhoto';
import LinkBehavior from '../../components/LinkBehavior';
import Skeleton from "@mui/material/Skeleton";
import truncateString from '../../utils/truncateString';

const BlogCard = data => {
    const loading = data == null;

    return (
        <Card
            variant="outlined"
            sx={{
                display: 'flex',
                textDecoration: 'none',
                color: 'unset',
                border: 'none',
                flexDirection: 'column',
                transition: '0.3s',
                cursor: 'pointer',
                '&: hover': {
                    opacity: 0.75
                }
            }}
            component={LinkBehavior}
            to={!loading && `/blogs/${data.id}`}
        >
            {loading ? (
                <Skeleton
                    animation="wave"
                    variant="circular"
                    width={40}
                    height={40}
                />
            ) : (
                <CardMedia
                    component="img"
                    width="130"
                    height="140"
                    alt='blog_post.png'
                    // src={data.BlogMultimedia.length ? getUserPhoto(data.BlogMultimedia[0].name) : null}
                    sx={{
                        borderRadius: 4,
                    }}
                />
            )}
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                mt: 1
            }}>
                <Box>
                    {loading ? (
                        <Skeleton
                            animation="wave"
                            height={10}
                            width="80%"
                            style={{ marginBottom: 6 }}
                        />
                    ) : (
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            fontWeight={700}
                            sx={{
                                textAlign: { xs: 'center', sm: 'start' },
                                mt: { xs: 1.5, sm: 0 },
                            }}
                        >
                            {data.title}
                        </Typography>
                    )}
                </Box>
            </Box>
        </Card>
    );
}

export default BlogCard
