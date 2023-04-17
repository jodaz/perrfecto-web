import SvgIcon from '@mui/material/SvgIcon';

export default function FilterAscending(props) {
    return (
        <SvgIcon {...props}>
            <path d="M15 10V5C15 3.62 15.62 3 17 3C18.38 3 19 3.62 19 5V10M19 7H15" stroke="inherit" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M19 21H15L19 14H15" stroke="inherit" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M4 15L7 18L10 15" stroke="inherit" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M7 6V18" stroke="inherit" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </SvgIcon>
    )
}
