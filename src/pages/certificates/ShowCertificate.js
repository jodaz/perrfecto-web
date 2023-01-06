import * as React from 'react'
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ShowCard from "../../components/Modals/ShowCard";
import getUserPhoto from '../../utils/getUserPhoto';
import CardMedia from "@mui/material/CardMedia";
import { useMediaQuery } from '@mui/material';
import { ArrowLeft } from 'lucide-react';

const ShowCertificate = ({ item, dog, user }) => {
    const { name, lastName = '', img_profile } = user
    const [open, setOpen] = React.useState(false)
    const userPhoto = img_profile ? getUserPhoto(JSON.parse(img_profile)[0]) : '/images/Avatar.svg'
    const dogPhoto = getUserPhoto(JSON.parse(dog.dogPhotos)[0])
    const certificatePhoto = getUserPhoto(item.name)
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('md'));

    const openDialog = () => {
        setOpen(true);
    }

    const closeDialog = () => {
        setOpen(false)
    }

    return (
        <>
            <Button
                variant="contained"
                onClick={openDialog}
            >
                Ver
            </Button>
            <ShowCard
                photo={userPhoto}
                name={`${name} ${lastName}`}
                open={open}
                handleClose={closeDialog}
                hideCloseButton
            >
                {!isSmall && (
                    <Box sx={{
                        flex: 1,
                        height: 400,
                        width: 400,
                        borderTopLeftRadius: '16px',
                        borderBottomLeftRadius: '16px'
                    }}>
                        <CardMedia
                            image={dogPhoto}
                            sx={{
                                height: 0,
                                paddingTop: '100%',
                                margin: 0,
                                borderTopLeftRadius: 'inherit',
                                borderBottomLeftRadius: 'inherit'
                            }}
                        />
                    </Box>
                )}
                <Box sx={{
                    height: '100%',
                    display: 'flex',
                    flex: 1,
                    alignItems: 'start',
                    flexDirection: 'column'
                }}>
                    <Box sx={{ p: 3, color: '#5E5E5E', cursor: 'pointer' }} onClick={closeDialog}>
                        <ArrowLeft />
                    </Box>
                    <CardMedia
                        image={certificatePhoto}
                        sx={{
                            height: '220px',
                            width: '220px',
                            margin: '0 auto',
                            boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.15)',
                            borderRadius: '20px'
                        }}
                    />
                </Box>
            </ShowCard>
        </>
    )
}

export default ShowCertificate
