import * as React from 'react';
import Fab from '@mui/material/Fab';
import { usePublications, toggleFilters } from '../../context/PublicationContext';
import { SlidersHorizontal } from 'lucide-react';

const FilterButton = () => {
    const { dispatch } = usePublications();

    return (
        <Fab color="primary" sx={{
            position: 'absolute',
            bottom: 16,
            right: 16,
        }} onClick={() => toggleFilters(dispatch)}>
            <SlidersHorizontal />
        </Fab>
    );
}

export default FilterButton;
