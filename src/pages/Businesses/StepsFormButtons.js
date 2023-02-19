import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import LinkBehavior from '../../components/LinkBehavior';

const StepsFormButtons = ({ next }) => (
    <Stack
        p={2}
        spacing={2}
        direction='row'
    >
        <Button
            component={LinkBehavior}
            to={-1}
            sx={{ color: theme => theme.palette.text.tertiary }}
        >
            Atrás
        </Button>
        <Button
            variant='contained'
            type='submit'
        >
            {next}
        </Button>
    </Stack>
);

StepsFormButtons.defaultProps = {
    next: 'Siguiente'
}

export default StepsFormButtons
