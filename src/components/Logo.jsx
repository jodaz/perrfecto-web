import * as React from 'react'
import { ReactComponent as LogoSvg } from '../assets/icons/Logo.svg'
import { ReactComponent as LogoTransparentSvg } from '../assets/icons/LogoTransparent.svg'

const Logo = ({ dark }) => (
    dark ? <LogoSvg /> : <LogoTransparentSvg />
);

export default Logo;
