import * as React from 'react';
import Box from '@mui/system/Box';
import IconButton from '@mui/material/IconButton';
import {
    LoginSocialGoogle,
    LoginSocialFacebook
} from 'reactjs-social-login';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as FacebookIcon } from '../../assets/icons/Facebook.svg'
import { ReactComponent as GoogleIcon } from '../../assets/icons/Google.svg'
import { ReactComponent as PhoneIcon } from '../../assets/icons/Phone.svg'
import vars from '../../vars';

const facebookFields = 'id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender'

const SocialLogin = ({ hidePhone }) => {
    const navigate = useNavigate();
    const [provider, setProvider] = React.useState('');
    const [profile, setProfile] = React.useState();

    return (
        <Box sx={{
            display: 'flex',
            width: 'fit-content',
            margin: '1rem 0',
            justifyContent: 'space-between'
        }}>
            <LoginSocialFacebook
                appId={vars.FacebookID}
                fieldsProfile={facebookFields}
                onResolve={({ provider, data }) => {
                    setProvider(provider);
                    setProfile(data);
                    navigate('/home')
                }}
                onReject={err => {
                    console.log(err);
                }}
            >
                <IconButton>
                    <FacebookIcon />
                </IconButton>
            </LoginSocialFacebook>
            <LoginSocialGoogle
                client_id={vars.GoogleID}
                scope="openid profile email"
                discoveryDocs="claims_supported"
                access_type="offline"
                onResolve={({ provider, data }) => {
                    setProvider(provider);
                    setProfile(data);
                    navigate('/home')
                }}
                onReject={err => {
                    console.log(err);
                }}
            >
                <IconButton>
                    <GoogleIcon />
                </IconButton>
            </LoginSocialGoogle>
            {(!hidePhone) && (
                <IconButton>
                    <PhoneIcon />
                </IconButton>
            )}
        </Box>
    )
}

export default SocialLogin
