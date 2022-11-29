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

const facebookFields = 'id,first_name,last_name,name,name_format,picture,email'

const SocialLogin = ({ hidePhone, location }) => {
    const { pathname } = location
    const navigate = useNavigate();

    const facebookHandler = ({ accessToken, ...rest }) => {
        return apiProvider
            .get(`/auth/facebook/token?access_token=${accessToken}`)
            .then(res => {
                // navigate('/home')
            })
            .catch(err => console.log(err));
    }

    const googleRegister = (data) => {
        return apiProvider
            .get(`/auth/google`)
            .then(res => {
                // navigate('/home')
            })
            .catch(err => console.log(err));
    }

    const googleSignIn = (data) => {
        return apiProvider
            .get(`/auth/google/signup`)
            .then(res => {
                // navigate('/home')
            })
            .catch(err => console.log(err));
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
                onResolve={({ data }) => facebookHandler(data)}
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
                onResolve={({ data }) => (pathname == '/login')
                    ? googleSignIn(data) : googleRegister(data)
                }
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
