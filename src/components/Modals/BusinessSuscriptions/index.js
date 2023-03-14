import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '../../DialogTitle';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import RegisterBusinessForm from './RegisterBusinessForm';
import { Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import EllipseImage from '../../EllipseImage';
import SocialAuth from '../../SocialAuth';
import { ArrowLeft } from 'lucide-react'

const BusinessSuscriptions = ({ location }) => {
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const navigate = useNavigate()
    const handleClose = () => navigate('/business')

    return (
        <Dialog
            onClose={handleClose}
            open={location.pathname == '/business/suscriptions'}
        >
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                width: isSmall ? 'fit-content' : '1000px',
                height: 'fit-content'
            }}>
                <Box sx={{
                    width: '100%',
                    backgroundColor: '#A167C9',
                    color: '#fff',
                    fontWeight: 400,
                    position: 'relative',
                    height: '175px',
                    borderBottomLeftRadius: '16px',
                    borderBottomRightRadius: '16px',
                    position: 'relative'
                }}>
                    <EllipseImage sx={{ top: 0, left: 0 }} n={'ChooseSuscription1'} />
                    <EllipseImage sx={{ bottom: 0, left: 200 }} n={'ChooseSuscription2'} />
                    <EllipseImage sx={{ top: 30, left: 450 }} n={'ChooseSuscription3'} />
                    <EllipseImage sx={{ top: 30, left: 450 }} n={'ChooseSuscription3'} />
                    <EllipseImage sx={{ top: 0, left: 650 }} n={'ChooseSuscription4'} />
                    <EllipseImage sx={{ bottom: 30, left: 825 }} n={'ChooseSuscription5'} />
                    <EllipseImage sx={{ bottom: 0, left: 600 }} n={'ChooseSuscription6'} />
                    <EllipseImage sx={{ top: 15, right: 30 }} n={'ChooseSuscription7'} />
                    <Box sx={{
                        margin: 5,
                        zIndex: 1000,
                        position: 'absolute',
                        top: 0
                    }}>
                        <Typography
                            variant="h4"
                            color="secondary.main"
                            sx={{ mb: 4, fontWeight: 500, display: 'inline-flex', alignItems: 'center' }}
                        >
                            <ArrowLeft /> <Box mr={2} /> Suscripciones
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{
                    width: '100%',
                    color: '#fff',
                    fontWeight: 400,
                    position: 'relative',
                    height: '525px',
                }}>
                </Box>
            </Box>
        </Dialog>
    );
}

export default BusinessSuscriptions
