import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Phone, MapPin, ChevronLeft, ArrowRight } from 'lucide-react'
import getUserPhoto from '../../utils/getUserPhoto';
import { format } from 'date-fns';
import { es } from 'date-fns/locale'

const PublishedBlog = ({ closePost, ...restData }) => {
    const {
        image,
        title,
        description,
        lastName,
        name,
        img_profile,
        published_at
    } = restData

    return (
        <Slide direction="left" in={true} mountOnEnter unmountOnExit>
            <Box sx={{
                height: '100%',
                width: '100%'
            }}>
                <Box sx={{
                    flex: 1,
                    height: 300,
                    width: '100%',
                    position: 'relative'
                }}>
                    <Box sx={{
                        position: 'absolute',
                        zIndex: 100,
                        bgcolor: 'rgba(0, 0, 0, 0.36)',
                        borderRadius: '100px',
                        left: 20,
                        top: 20
                    }}>
                        <IconButton onClick={closePost}>
                            <ChevronLeft color="#fff" />
                        </IconButton>
                    </Box>
                    <Box
                        component="img"
                        width="100%"
                        height="300px"
                        alt='blog_post.png'
                        src={image}
                    />
                </Box>
                <Box sx={{
                    borderRadius: '24px 24px 0px 0px',
                    display: 'flex',
                    flexDirection: 'column',
                    borderTopLeftRadius: '16px',
                    borderTopRightRadius: '16px',
                }}>
                    <Stack
                        orientation='vertical'
                        spacing={1}
                        sx={{ p: 2 }}
                    >
                        <Typography
                            component="div"
                            variant="body2"
                            color="text.tertiary"
                            fontWeight={500}
                            sx={{ textTransform: 'capitalize' }}
                        >
                            {format(published_at, 'MMMM d, y', { locale: es })}
                        </Typography>
                        <Typography
                            component="div"
                            variant="body2"
                            color="text.primary"
                        >
                            {`${name} ${lastName}`}
                        </Typography>
                        <Typography
                            variant="h5"
                            color="text.primary"
                            fontWeight={500}
                        >
                            {title}
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            color="text.secondary"
                        >
                            {description}
                        </Typography>
                    </Stack>
                </Box>
            </Box>
        </Slide>
    )
}

export default PublishedBlog
