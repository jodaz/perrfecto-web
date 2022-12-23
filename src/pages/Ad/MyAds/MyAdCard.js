import * as React from 'react'
import Box from "@mui/material/Box";
import PhotoGallery from "../../../components/Modals/ShowCard/PhotoGallery";
import getUserPhoto from "../../../utils/getUserPhoto";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import { Mail, Phone } from 'lucide-react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from "../../../components/Menu";
import DeleteAd from "../../../components/Modals/DeleteAd";
import { Chip } from '@mui/material';

const getImages = arrImages => arrImages.map(image => getUserPhoto(image));

const interes = ['Hembra', 'Tamaño pequeño', 'Tamaño grande'];

const CustomBadge = ({ children, count}) => (
    <Badge
        badgeContent={`${count}`}
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
        {children}
    </Badge>
)

const MyAdCard = ({ fullWidth, dog, publication, email, phone, code_phone }) => {
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false)
    const { Certificates, Vaccines } = dog
    const { multimedia } = publication;
    const arrImages = getImages(JSON.parse(multimedia))

    const handleCloseDeleteModal = () => {
        setOpenDeleteModal(false)
    }

    return (
        <Card sx={{
            maxWidth: !fullWidth ? 250 : '100%',
            m: 2,
            boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.24)',
            borderRadius: '20px',
            cursor: 'pointer'
        }}>
            <Box sx={{ flex: 1, aspectRatio: '1 / 1', width: '100%', position: 'relative' }}>
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
                <Box spacing={3} sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    marginTop: '1rem'
                }}>
                    {interes.map(item => <Chip label={item} size="small" sx={{ mb: 1, mr: 1 }} />)}
                </Box>
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
                <Box spacing={3} sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    marginTop: '1rem',
                    '& > *': {
                        mr: 1,
                        mb: 1
                    }
                }}>
                    <CustomBadge count={`${Certificates.length}`}>
                        <Button
                            variant="contained"
                            sx={{
                                padding: '8px, 16px, 8px, 16px',
                                fontSize: '14px'
                            }}
                        >
                            Certificados
                        </Button>
                    </CustomBadge>
                    <CustomBadge count={`${Vaccines.length}`}>
                        <Button
                            variant="contained"
                            sx={{
                                padding: '8px, 16px, 8px, 16px',
                                fontSize: '14px'
                            }}
                        >
                            Vacunas
                        </Button>
                    </CustomBadge>
                </Box>
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
