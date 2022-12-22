import * as React from 'react'
import Box from "@mui/material/Box";
import PhotoGallery from "../../../components/Modals/ShowCard/PhotoGallery";
import getUserPhoto from "../../../utils/getUserPhoto";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import { Mail, Phone } from 'lucide-react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from "../../../components/Menu";
import DeleteAd from "../../../components/Modals/DeleteAd";

const getImages = arrImages => arrImages.map(image => getUserPhoto(image));

const MyAdCard = ({ dog, publication, email, phone, code_phone }) => {
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false)
    const { Certificates, Vaccines } = dog
    const { multimedia } = publication;
    const arrImages = getImages(JSON.parse(multimedia))

    const handleCloseDeleteModal = () => {
        setOpenDeleteModal(false)
    }

    return (
        <Card sx={{
            maxWidth: 250,
            m: 2,
            boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.24)',
            borderRadius: '20px'
        }}>
            <Box sx={{ flex: 1, height: 250, width: 250, position: 'relative' }}>
                <PhotoGallery images={arrImages} />
                <Menu
                    icon={<MoreVertIcon />}
                    IconButtonProps={{
                        sx: {
                            position: 'absolute',
                            zIndex: 10,
                            top: 0,
                            right: 0
                        }
                    }}
                >
                    <Box onClick={() => setOpenDeleteModal(true)}>
                        Eliminar anuncio
                    </Box>
                </Menu>
            </Box>
            <CardContent>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    {publication.description}
                </Typography>
                {phone && (
                    <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        gutterBottom
                        sx={{ display: 'flex', alignItems: 'center' }}
                    >
                        <Box>
                            <Phone />
                        </Box>
                        <Box marginRight='1rem' />
                        {code_phone}&nbsp;{phone}
                    </Typography>
                )}
                <Typography variant="subtitle1" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                    <Mail />
                    <Box marginRight='1rem' />
                    {email}
                </Typography>
                <Stack spacing={3} direction="row" sx={{ paddingTop: '1rem' }}>
                    <Badge
                        badgeContent={`${Certificates.length}`}
                        color="primary"
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right'
                        }}
                        sx={{
                            '& .MuiBadge-badge': {
                                height: '25px !important',
                                width: '25px !important',
                                borderRadius: '100px',
                                color: '#fff',
                                backgroundColor: theme => theme.palette.warning.main
                            }
                        }}
                    >
                        <Button variant="contained" sx={{ padding: '8px, 16px, 8px, 16px' }}>
                            Certificados
                        </Button>
                    </Badge>
                    <Badge
                        badgeContent={`${Vaccines.length}`}
                        color="primary"
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right'
                        }}
                        sx={{
                            '& .MuiBadge-badge': {
                                height: '25px !important',
                                width: '25px !important',
                                borderRadius: '100px',
                                color: '#fff',
                                backgroundColor: theme => theme.palette.warning.main
                            }
                        }}
                    >
                        <Button variant="contained" sx={{ padding: '8px, 16px, 8px, 16px' }}>
                            Vacunas
                        </Button>
                    </Badge>
                </Stack>
                <DeleteAd
                    open={openDeleteModal}
                    handleClose={handleCloseDeleteModal}
                    item={publication}
                />
            </CardContent>
        </Card>
    )
}

export default MyAdCard
