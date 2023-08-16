import SvgIcon from '@mui/material/SvgIcon';

export default function FilterDescending(props) {
    return (
        <SvgIcon {...props}>
            <path d="M15 21V16C15 14.62 15.62 14 17 14C18.38 14 19 14.62 19 16V21M19 18H15" stroke="inherit" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M19 10H15L19 3H15" stroke="inherit" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M4 15L7 18L10 15" stroke="inherit" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M7 6V18" stroke="inherit" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </SvgIcon>
    )
}
