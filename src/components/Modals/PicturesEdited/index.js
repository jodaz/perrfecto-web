import * as React from 'react';
import InstagramModal from '../InstagramModal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ReactComponent as CheckCircle } from '../../../assets/icons/CheckCircle.svg'
import LinkBehavior from '../../LinkBehavior'

const PicturesEdited = ({ open, handleClose }) => (
    <InstagramModal handleClose={handleClose} open={open}>
        <Box sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            background: '#fff',
            borderRadius: '12px',
            width: 'fit-content'
        }}>
            <Box sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                p: 3,
                textAlign: 'center'
            }}>
                <CheckCircle />
                <Typography
                    color="text.primary"
                    variant="subtitle1"
                    gutterBottom
                >
                    Sus fotos fueron actualizadas
                </Typography>
                <Button color="primary" component={LinkBehavior} to='/profile'>
                    Ok
                </Button>
            </Box>
        </Box>
    </InstagramModal>
);

export default PicturesEdited
