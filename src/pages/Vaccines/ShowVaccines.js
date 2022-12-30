import * as React from 'react'
import Box from "@mui/material/Box";
import ButtonBadge from '../../components/Buttons/ButtonBadge';
import ShowCard from "../../components/Modals/ShowCard";
import getUserPhoto from '../../utils/getUserPhoto';
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const VaccineContainer = ({ children, id }) => (
    <Box sx={{
        border: '1px solid #CCCCCC',
        borderRadius: '100px',
        padding: '1rem',
        width: '80%',
        p: 2
    }} key={id}>
        <Typography>
            {children}
        </Typography>
    </Box>
)

const ShowVaccines = ({ dog, name, lastName = '', img_profile }) => {
    const [open, setOpen] = React.useState(false)
    const photo = getUserPhoto(img_profile)
    const image = getUserPhoto(JSON.parse(dog.dogPhotos)[0])

    const toggleDialog = () => {
        setOpen(!open)
    }

    return (
        <>
            <ButtonBadge
                total={dog.Vaccines.length}
                onClick={toggleDialog}
            >
                Vacunas
            </ButtonBadge>
            <ShowCard
                photo={photo}
                name={`${name} ${lastName}`}
                open={open}
                handleClose={toggleDialog}
            >
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
                <Box sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    alignItems: 'center'
                }}>
                    <Box sx={{ p: 3 }}>
                        <Typography
                            variant="h6"
                            fontWeight={500}
                            color="primary"
                        >
                            Vacunas
                        </Typography>
                    </Box>
                    {dog.Vaccines.map((item, i) => (
                        <VaccineContainer id={i}>
                            {item.name}
                        </VaccineContainer>
                    ))}
                </Box>
            </ShowCard>
        </>
    )
}

export default ShowVaccines
