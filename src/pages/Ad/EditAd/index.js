import * as React from 'react';
import { useMediaQuery } from '@mui/material';
import EditAdMobile from './EditAdMobile';
import OnlyDesktop from '../../../layouts/App/OnlyDesktop';
import EditAdDesktop from './EditAdDesktop';
import PetProfile from '../../Profile/PetProfile';

const EditAd = () => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('md'));

    if (isSmall) {
        return <EditAdMobile />
    }

    return (
        <OnlyDesktop
            aside={<PetProfile />}
            principal={<EditAdDesktop />}
        />
    )
}

export default EditAd
