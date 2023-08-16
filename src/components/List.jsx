import * as React from 'react';
import MuiList from '@mui/material/List';

const List = ({ children }) => (
    <MuiList sx={{
        padding: '8px !important',
        marginBottom: 1
    }}>
        {children}
    </MuiList>
)

export default List
