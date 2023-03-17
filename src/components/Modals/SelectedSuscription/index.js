import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '../../DialogTitle';
import Box from '@mui/material/Box';
import { matchRoutes, useNavigate } from 'react-router-dom';
import { Typography, Link as MuiLink, styled } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import EllipseImage from '../../EllipseImage';
import { IconButton } from '@mui/material';
import LinkBehavior from '../../LinkBehavior';
import { ArrowLeft } from 'lucide-react'
import SuscriptionCard from '../../../pages/Landing/SuscriptionCard';
import PaymentMethods from '../../../pages/packs/PaymentMethods';

const Link = styled(MuiLink)(({ theme }) => ({
    color: theme.palette.primary.contrastText,
    fontWeight: 600,
    '&:hover': {
        textDecoration: 'underline'
    }
}));

const SelectedSuscription = ({ location }) => {
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const navigate = useNavigate()
    const handleClose = () => navigate('/business')
    const matched = matchRoutes([{ path: '/business/suscriptions/:id' }], location)

    return (
        <Dialog
            onClose={handleClose}
            open={matched}
        >
            <Box sx={{
                display: 'flex',
                width: isSmall ? 'fit-content' : '800px',
                height: 'fit-content',
                height: '600px',
            }}>
                {!isSmall && (
                    <Box sx={{
                        flex: 1,
                        backgroundColor: '#A167C9',
                        color: '#fff',
                        fontWeight: 400,
                        position: 'relative',
                        height: 'inherit'
                    }}>
                        <EllipseImage sx={{ bottom: 0, right: 0 }} n={'Ellipse9'} />
                        <EllipseImage sx={{ right: '50px', top: '550px' }} n={'Ellipse8'} />
                        <EllipseImage sx={{ right: '50px', top: '550px' }} n={'Ellipse8'} />
                        <EllipseImage sx={{ right: '50px', top: '350px' }} n={'Ellipse7'} />
                        <EllipseImage sx={{ right: 0, top: '50px' }} n={'Ellipse6'} />
                        <EllipseImage sx={{ top: '200px', left: '150px' }} n={'Ellipse5'} />
                        <EllipseImage sx={{ top: '450px', left: '50px' }} n={'Ellipse4'} />
                        <EllipseImage sx={{ top: '200px' }} n={'Ellipse1'} />
                        <EllipseImage sx={{ bottom: '0' }} n={'Ellipse2'} />
                        <EllipseImage sx={{ top: '0' }} n={'Ellipse3'} />
                        <Box sx={{
                            margin: 5,
                            zIndex: 1000,
                            position: 'absolute',
                            top: 0
                        }}>
                            <Box sx={{
                                margin: 5,
                                zIndex: 1000,
                                position: 'absolute',
                                top: 0,
                                left: 0
                            }}>
                                <Typography
                                    variant="h5"
                                    color="secondary.main"
                                    sx={{ mb: 4, fontWeight: 500, display: 'inline-flex', alignItems: 'center' }}
                                >
                                    <IconButton component={LinkBehavior} to={-1}>
                                        <ArrowLeft color="#fff"/>
                                    </IconButton>
                                    <Box mr={2} />
                                    Suscripción {location.state.name}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                )}
                <Box sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '600px',
                }}>
                    <DialogTitle onClose={handleClose} />
                    <Box sx={{
                        display: 'flex',
                        p: 4,
                        flexDirection: 'column'
                    }}>
                        <SuscriptionCard data={location.state} selectedPlan={location.state} hideButton />
                        <PaymentMethods />
                    </Box>
                </Box>
            </Box>
        </Dialog>
    );
}

export default SelectedSuscription
