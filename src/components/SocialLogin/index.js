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
import LinkBehavior from '../LinkBehavior';
import { apiProvider } from '../../api'
import vars from '../../vars';

const facebookFields = 'id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender'

const SocialLogin = ({ hidePhone }) => {
    const navigate = useNavigate();

    const processResponse = (provider, data) => {
        console.log(data)
        // const { access_token } = data

        // return apiProvider.get(`/auth/facebook/token`)
        //     .then(res => console.log(res.data)).catch(err => console.log(err));
    }

    return (
        <Box sx={{
            display: 'flex',
            width: 'fit-content',
            margin: '1rem auto',
            justifyContent: 'space-between'
        }}>
            <LoginSocialFacebook
                appId={vars.FacebookID}
                fieldsProfile={facebookFields}
                onResolve={({ provider, data }) => {
                    processResponse(provider, data)
                }}
                onReject={err => {
                    console.log(err);
                }}
            >
                <IconButton sx={{
                    margin: '0 !important'
                }}>
                    <FacebookIcon />
                </IconButton>
            </LoginSocialFacebook>
            <LoginSocialGoogle
                client_id={vars.GoogleID}
                scope="openid profile email"
                discoveryDocs="claims_supported"
                access_type="offline"
                onResolve={({ provider, data }) => {
                    processResponse(provider, data)
                }}
                onReject={err => {
                    console.log(err);
                }}
            >
                <IconButton sx={{
                    margin: '0 !important'
                }}>
                    <GoogleIcon />
                </IconButton>
            </LoginSocialGoogle>
            {(!hidePhone) && (
                <IconButton component={LinkBehavior} to='?withPhone=true'>
                    <PhoneIcon />
                </IconButton>
            )}
        </Box>
    )
}

SocialLogin.defaultProps = {
    hidePhone: false,
    path: '/register'
}

export default SocialLogin
