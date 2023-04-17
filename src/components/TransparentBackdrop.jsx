import styled from '@emotion/styled';
import Backdrop from '@mui/material/Backdrop';

const TransparentBackdrop = styled(Backdrop)(() => ({
    background: 'transparent',
    backdropFilter: 'none'
}))

export default TransparentBackdrop;
