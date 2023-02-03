import * as React from 'react';
import Box from '@mui/system/Box';
import IconButton from '@mui/material/IconButton';
import {
    LoginSocialGoogle,
    LoginSocialFacebook
} from 'reactjs-social-login';
import Alert from '@mui/material/Alert'
import { useNavigate } from 'react-router-dom';
import { ReactComponent as FacebookIcon } from '../../assets/icons/Facebook.svg'
import { ReactComponent as GoogleIcon } from '../../assets/icons/Google.svg'
import { Smartphone } from 'lucide-react';
import LinkBehavior from '../LinkBehavior';
import { apiProvider } from '../../api'
import vars from '../../vars';
import { useAuth, loginUser } from '../../context/AuthContext'
import { alpha } from '@mui/material';
import styled from '@emotion/styled';

const facebookFields = 'id,first_name,last_name,name,name_format,picture,email'

const SocialIcon = styled(IconButton)(({ color }) => ({
    margin: '0.5rem',
    padding: '0 !important',
    backgroundColor: color,
    boxShadow: '0px 1px 12px rgba(0, 0, 0, 0.12)',
    height: '48px',
    width: '48px',
    '&:hover': {
        backgroundColor: `${alpha(color, 0.8)} !important`
    }
}))

const SocialAuth = ({ hidePhone, location }) => {
    const [error, setError] = React.useState(false)
    const navigate = useNavigate();
    const { dispatch } = useAuth();

    const onSubmit = async data => {
        setError(false);

        try {
            if (location.pathname == '/register') {
                data.role = 'user'
            }
            if (location.pathname == '/business/register') {
                data.role = 'business'
            }

            const res = await apiProvider.post('/api/auth/social-network', data)

            if (res.status >= 200 && res.status < 300) {
                const { data } = res;

                loginUser(dispatch, data)

                if (data.data.register) {
                    return navigate('/register/welcome')
                } else {
                    navigate('/detect-location')
                }
            }
        } catch (error) {
            const message = error.response.data.msg;

            if (message.includes('deleted')) {
                setError('Su cuenta ha sido eliminada.')
            } else {
                setError('Ha ocurrido un error')
            }
        };
    };

    return (
        <Box>
            {(error) && (
                <Alert severity="error" sx={{ margin: '1.5rem 0' }}>
                    {error}
                </Alert>
            )}
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
                    <SocialIcon color="#1B77F2">
                        <FacebookIcon />
                    </SocialIcon>
                </LoginSocialFacebook>
                <LoginSocialGoogle
                    client_id={vars.GoogleID}
                    scope="openid profile email"
                    discoveryDocs="claims_supported"
                    access_type="offline"
                    onResolve={({ data }) => onSubmit(data)}
                >
                    <SocialIcon color="#ffffff">
                        <GoogleIcon />
                    </SocialIcon>
                </LoginSocialGoogle>
                {(!hidePhone) && (
                    <SocialIcon
                        color="#35414C"
                        component={LinkBehavior}
                        to='?withPhone=true'
                    >
                        <Smartphone color="#fff" />
                    </SocialIcon>
                )}
            </Box>
        </Box>
    )
}

SocialAuth.defaultProps = {
    hidePhone: false,
    path: '/register'
}

export default SocialAuth
