import SvgIcon from '@mui/material/SvgIcon';

export default function Close(props) {
    return (
        <SvgIcon {...props}>
            <path d="M18 6L6 18" stroke="inherit" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M6 6L18 18" stroke="inherit" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </SvgIcon>
    )
}
