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
import { useAuth, loginUser } from '../../context/AuthContext'

const facebookFields = 'id,first_name,last_name,name,name_format,picture,email'

const SocialAuth = ({ hidePhone }) => {
    const [error, setError] = React.useState(false)
    const navigate = useNavigate();
    const { dispatch } = useAuth();

    const onSubmit = async (data) => {
        setError(false);

        const res = await apiProvider.post('/api/auth/social-network', {
            ...data
        }).catch(error => {
            if (error.response.status == 400) {
                setError(true)
            }
        });

        if (res.status >= 200 && res.status < 300) {
            const { data } = res;

            loginUser(dispatch, data)

            if (data.data.register) {
                return navigate('/register/welcome')
            } else {
                navigate('/detect-location')
            }
        }
    };

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
                onResolve={({ data }) => onSubmit(data)}
            >
                <IconButton sx={{
                    margin: '0 !important',
                    padding: '0 !important'
                }}>
                    <FacebookIcon />
                </IconButton>
            </LoginSocialFacebook>
            <LoginSocialGoogle
                client_id={vars.GoogleID}
                scope="openid profile email"
                discoveryDocs="claims_supported"
                access_type="offline"
                onResolve={({ data }) => onSubmit(data)}
            >
                <IconButton sx={{
                    margin: '0 !important',
                    padding: '0 !important'
                }}>
                    <GoogleIcon />
                </IconButton>
            </LoginSocialGoogle>
            {(!hidePhone) && (
                <IconButton component={LinkBehavior} to='?withPhone=true' sx={{
                    margin: '0 !important',
                    padding: '0 !important'
                }}>
                    <PhoneIcon />
                </IconButton>
            )}
        </Box>
    )
}

SocialAuth.defaultProps = {
    hidePhone: false,
    path: '/register'
}

export default SocialAuth
