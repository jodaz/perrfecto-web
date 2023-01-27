import * as React from 'react'
import Box from "@mui/material/Box";
import PhotoGallery from "../../../components/Modals/ShowCard/PhotoGallery";
import getUserPhoto from "../../../utils/getUserPhoto";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from "../../../components/Menu";
import DeleteAd from "../../../components/Modals/DeleteAd";
import LinkBehavior from '../../../components/LinkBehavior';
import ShowVaccines from '../../Vaccines/ShowVaccines';
import ListCertificates from '../../certificates/ListCertificates';
import { Stack } from '@mui/system';
import StarIconButton from '../../../components/Buttons/FavouriteButton/StarIconButton';
import LikeIconButton from '../../../components/Buttons/LikeButton/LikeIconButton';
import MessageIconButton from '../../../components/Buttons/MessageButton/MessageIconButton';
import DogInformation from '../DogInformation';

const getImages = arrImages => arrImages.map(image => getUserPhoto(image));

const MyAdCard = ({ fullWidth, ...data  }) => {
    const { publication } = data
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false)
    const { multimedia } = publication;
    const arrImages = getImages(JSON.parse(multimedia))

    const handleCloseDeleteModal = () => {
        setOpenDeleteModal(false)
    }

    return (
        <Card sx={{
            maxWidth: '100%',
            m: 2,
            boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.24)',
            borderRadius: '20px',
            minHeight: '500px'
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
                    <Box
                        component={LinkBehavior}
                        to={`/profile/ads/show`}
                        width='inherit'
                        sx={{ textDecoration: 'none', color: 'unset' }}
                    >
                        Ver anuncio
                    </Box>
                    <Box
                        component={LinkBehavior}
                        to={`/profile/ads/${publication.id}/edit`}
                        width='inherit'
                        sx={{ textDecoration: 'none', color: 'unset' }}
                    >
                        Editar anuncio
                    </Box>
                    <Box onClick={() => setOpenDeleteModal(true)} width='inherit'>
                        Eliminar anuncio
                    </Box>
                </Menu>
            </Box>
            <CardContent>
                <DogInformation hideTitle />
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    {publication.description}
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
                    {!!data.dog.Certificates.length && (
                        <ListCertificates {...data} />
                    )}
                    {!!data.dog.Vaccines.length && (
                        <ShowVaccines {...data} />
                    )}
                </Box>
                <DeleteAd
                    open={openDeleteModal}
                    handleClose={handleCloseDeleteModal}
                    item={publication}
                />
                <Stack spacing={2} direction="row" mt={2}>
                    <StarIconButton />
                    <LikeIconButton likes={0} />
                    <MessageIconButton active={true} />
                </Stack>
            </CardContent>
        </Card>
    )
}

export default MyAdCard
