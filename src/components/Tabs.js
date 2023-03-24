import * as React from 'react';
import MuiToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { styled } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom';

const ToggleButtonGroup = styled(MuiToggleButtonGroup)(({ theme }) => ({
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: '100px',
    justifyContent: 'center',
    width: 'fit-content',
}));

const Tabs = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleAlignment = (event, newAlignment) => {
        navigate(`${newAlignment}`);
    };

    return (
        <ToggleButtonGroup
            value={location.pathname}
            exclusive
            onChange={handleAlignment}
        >
            {React.Children.map(children, child => {
                if (React.isValidElement(child)) {
                    return (
                        <>
                            {React.cloneElement(child, {
                                onClick: handleAlignment,
                                currentPath: location.pathname
                            })}
                        </>
                    )
                }
            })}
        </ToggleButtonGroup>
    );
}

export default Tabs
