import * as React from 'react'
import Box from "@mui/material/Box";
import ButtonBadge from '../../components/Buttons/ButtonBadge';
import ShowCard from "../../components/Modals/ShowCard";
import getUserPhoto from '../../utils/getUserPhoto';
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useMediaQuery } from '@mui/material';
import ShowCertificate from './ShowCertificate';

const CertificateItem = ({ children, id, ...data }) => (
    <Box sx={{
        border: '1px solid #CCCCCC',
        borderRadius: '100px',
        padding: '1rem',
        width: '70%',
        m: 1,
        display: 'flex',
        maxWidth: '300px'
    }} key={id}>
        <Typography sx={{
            display: 'flex',
            alignItems: 'center',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            marginRight: '1rem'
        }}>
            {children}
        </Typography>
        <ShowCertificate {...data} />
    </Box>
)

const ListCertificates = ({ dog, ...userProps }) => {
    const { name, lastName = '', img_profile } = userProps
    const [open, setOpen] = React.useState(false)
    const photo = img_profile ? getUserPhoto(JSON.parse(img_profile)[0]) : '/images/Avatar.svg'
    const image = getUserPhoto(JSON.parse(dog.dogPhotos)[0])
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('md'));

    const toggleDialog = () => {
        setOpen(!open)
    }

    return (
        <>
            <ButtonBadge
                total={dog.Certificates.length}
                onClick={toggleDialog}
            >
                Certificados
            </ButtonBadge>
            <ShowCard
                photo={photo}
                name={`${name} ${lastName}`}
                open={open}
                handleClose={toggleDialog}
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
                            image={image}
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
                    flexDirection: 'column',
                    flex: 1,
                    alignItems: 'center',
                    paddingBottom: '1rem'
                }}>
                    <Box sx={{ p: 3 }}>
                        <Typography
                            variant="h6"
                            fontWeight={500}
                            color="primary"
                        >
                            Certificados
                        </Typography>
                    </Box>
                    {dog.Certificates.map((item, i) => (
                        <CertificateItem
                            id={i}
                            item={item}
                            user={userProps}
                            dog={dog}
                        >
                            {item.name}
                        </CertificateItem>
                    ))}
                </Box>
            </ShowCard>
        </>
    )
}

export default ListCertificates
