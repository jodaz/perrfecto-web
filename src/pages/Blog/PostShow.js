import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SettingsLayout from '../../layouts/SettingsLayout';

const PostShow = () => (
    <SettingsLayout title='Blog'>
        <Box sx={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column'
        }}>
            <Box p={1}>
                <Box
                    component="img"
                    width="100%"
                    height="300px"
                    alt='blog_post.png'
                    src={'/images/samples/sad-pupi.png'}
                    sx={{
                        borderRadius: 4,
                    }}
                />
            </Box>
            <Box p={1}>
                <Typography
                    component="div"
                    variant="body2"
                    color="text.tertiary"
                    fontWeight={500}
                >
                    Enero 3, 2022
                </Typography>
            </Box>
            <Box sx={{
                display: 'flex',
                justifyContent: 'start',
                flex: 1,
                p: 1
            }}>
                <Box
                    component="img"
                    alt='blog_post.png'
                    src={'/images/samples/sad-pupi.png'}
                    sx={{
                        maxWidth: 22,
                        maxHeight: 22,
                        borderRadius: 1,
                        mr: 1
                    }}
                />
                <Typography
                    component="div"
                    variant="body2"
                    color="text.primary"
                >
                    {`Mason Eduard`}
                </Typography>
            </Box>
            <Box p={1}>
                <Typography
                    component="div"
                    variant="h6"
                    color="text.primary"
                    fontWeight={700}
                >
                    Cómo afecta la muda del pelo canino.
                </Typography>
            </Box>
            <Box p={1}>
                <Typography
                    component="div"
                    variant="subtitle1"
                    color="text.primary"
                    // fontWeight={500}
                >
                    Pelos por el suelo, el sofá, la alfombra,… en aquellos lugares en los que nuestra
                    mascota se encuentre cerca, podremos encontrar la gran ‘molestia’ del pelaje.
                    ¿Cómo afecta
                    la muda de pelo a los perros?
                    La mayoría de los canes, renuevan su pelaje para adecuarse y protegerse frente a
                    las diferentes climatologías (frío o calor). Es por ello que en otoño y en primavera son
                    las estaciones principales en las que notamos más los pelos, cuando se produce
                    generalmente la muda de pelo en los perros. No obstante, hay hogares, y puede que el
                    tuyo sea uno de ellos, en el que parece que los pelos nunca desaparecen. Esto puede ser
                    debido a que tu mascota no sufre grandes cambios de temperatura.
                </Typography>
            </Box>
        </Box>
    </SettingsLayout>
);

export default PostShow
