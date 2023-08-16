import * as React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { alpha } from '@mui/material';
import LinkBehavior from '../../components/LinkBehavior';
import ItemWithCheck from '../../components/ItemWithCheck';
import getUserPhoto from '../../utils/getUserPhoto'

const SuscriptionCard = ({
    data,
    selectable = false,
    selectPlan,
    selectedPlan,
    hideButton
}) => (
    <Box sx={{
        display: 'flex',
        boxSizing: 'border-box',
        alignItems: 'center',
        borderRadius: '16px',
        color: '#fff',
        height: '420px',
        justifyContent: 'space-between',
        p: 2,
        maxWidth: '280px',
        cursor: selectable ? 'pointer' : 'auto',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        flexDirection: 'column',
        backgroundColor: 'gray',
        textDecoration: 'none',
        background: `url(${data.Banner && getUserPhoto(data.Banner.img)})`,
        border: theme => (selectedPlan && selectedPlan.id == data.id) ? `4px solid ${theme.palette.warning.main}` : 'unset'
    }} onClick={selectable ? () => selectPlan(data) : null}>
        <Box sx={{
            size: '16px',
        }}>
            <Typography
                variant="subtitle1"
                textAlign='center'
                fontSize='24px'
                fontWeight={700}
            >
                Subscripción <br/> {data.name}
            </Typography>
            {data.Benefits.map(item => (
                <ItemWithCheck>{item.description}</ItemWithCheck>
            ))}
        </Box>
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <Box sx={{
                display: 'flex',
                color: '#fff'
            }}>
                <Typography
                    variant="subtitle1"
                    fontWeight={700}
                    fontSize='16px'
                    alignSelf='center'
                    mr='2px'
                >
                    $
                </Typography>
                <Typography
                    variant="subtitle1"
                    fontWeight={700}
                    fontSize='2.75rem'
                    mr='3px'
                >
                    {data.PriceBySubscriptions[0].price}
                </Typography>
                <Typography
                    variant="subtitle1"
                    fontWeight={500}
                    fontSize='1rem'
                    mt='4px'
                >
                    / mes
                </Typography>
            </Box>
            {!(hideButton || selectable) && (
                <Button variant="contained" sx={{
                    backgroundColor: theme => theme.palette.secondary.main,
                    color: theme => theme.palette.primary.main,
                    '&:hover': {
                        backgroundColor: theme => `${alpha(theme.palette.secondary.main, 0.9)}`,
                    }
                }} component={LinkBehavior} to='/business/register'>
                    Adquirir subscripción
                </Button>
            )}
        </Box>
    </Box>
)

export default SuscriptionCard
