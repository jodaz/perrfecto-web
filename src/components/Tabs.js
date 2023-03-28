import * as React from 'react';
import PropTypes from 'prop-types';
import MuiTabs from '@mui/material/Tabs';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Tab from './Tab';

const StyledMuiTabs = styled(MuiTabs)(({ theme }) => ({
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: '100px',
    justifyContent: 'center',
    width: 'fit-content'
}));

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Box
            component="div"
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
            sx={{
                display: (value == index) ? 'flex' : 'none',
                position: 'relative',
                flexDirection: 'column',
                width: '100%',
                margin: '0 auto',
                height: '100%',
                zIndex: 100
            }}
        >
            {value === index && (
                <Box sx={{ height: 'inherit' }}>
                    {children}
                </Box>
            )}
        </Box>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const Tabs = ({ children, Tabs }) => {
    const childrenCount = React.Children.count(children);
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            height: '100%'
        }}>
            <StyledMuiTabs
                value={value}
                onChange={handleChange}
                sx={{ '& .MuiTabs-indicator': { display: 'none' } }}
            >
                <Tab label="Feed" {...a11yProps(0)} />
                <Tab label="Mascota destacada" {...a11yProps(1)} />
                <Tab label="Ranking" {...a11yProps(2)} />
            </StyledMuiTabs>
            {(childrenCount) && (
                React.Children.map(children, (child, i) => {
                    if (React.isValidElement(child)) {
                        return (
                            <TabPanel value={value} index={i}>
                                {child}
                            </TabPanel>
                        )
                    }
                })
            )}
        </Box>
    );
}

export default Tabs
