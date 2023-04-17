import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import ListPacks from './ListPacks';
import UserPack from './UserPack';
import getSearchParams from '../../utils/getSearchParams'

const Packs = ({ location }) => {
    const hasPlan = getSearchParams(location, 'hasPlan')

    if (!hasPlan) {
        return <ListPacks />
    }

    return <UserPack />;
}

export default Packs
