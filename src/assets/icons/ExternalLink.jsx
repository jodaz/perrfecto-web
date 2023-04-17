import SvgIcon from '@mui/material/SvgIcon';

export default function ExternalLink(props) {
    return (
        <SvgIcon {...props}>
            <path d="M11 7H6C5.46957 7 4.96086 7.21071 4.58579 7.58579C4.21071 7.96086 4 8.46957 4 9V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20H15C15.5304 20 16.0391 19.7893 16.4142 19.4142C16.7893 19.0391 17 18.5304 17 18V13" stroke="inherit" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M10 14L20 4" stroke="inherit" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M15 4H20V9" stroke="inherit" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </SvgIcon>
    )
}

