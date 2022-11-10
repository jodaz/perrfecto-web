import MuiButton from '@mui/material/Button';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';

const Button = ({ disabled, children, ...rest }) => (
    <MuiButton disabled={disabled} {...rest}>
        {(disabled) ? (
            <CircularProgress color="text" size='29px' />
        ) : (
            <>{children}</>
        )}
    </MuiButton>
)

Button.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
};

export default Button
