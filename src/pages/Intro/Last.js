import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import LinkBehavior from '../../components/LinkBehavior'

const Last = ({ jumpIntro }) => {
    return (
        <>
            <Box sx={{
                fontSize: '1.5rem',
                fontWeight: 500
            }}>
                ¡Ya estás listo!
            </Box>
            <Box>
                Comienza a disfrutar de TinderDogs
            </Box>
            <Button variant="contained" component={LinkBehavior} to='/market' onClick={jumpIntro}>
                Comenzar
            </Button>
        </>
    );
}

export default Last;
