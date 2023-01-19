import * as React from 'react'
import { ReactComponent as LogoSvg } from '../assets/icons/Logo.svg'

const Logo = ({ dark }) => (
    dark ? <LogoSvg /> : <LogoSvg />
);

export default Logo;
