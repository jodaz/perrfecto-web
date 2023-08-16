import * as React from 'react'
import EllipseImage from '../../components/EllipseImage';

const DogSectionPawprints = () => (
    <>
        <EllipseImage
            n='pawprints/huella1'
            sx={{
                top: '30px',
                right: '50px'
            }}
        />
        <EllipseImage
            n='pawprints/huella2'
            sx={{
                top: '200px',
                right: '40px'
            }}
        />
        <EllipseImage
            n='pawprints/huella6'
            sx={{
                top: '400px',
                right: '70px'
            }}
        />
        <EllipseImage
            n='pawprints/huella3'
            sx={{
                top: '30px',
                left: '90px'
            }}
        />
        <EllipseImage
            n='pawprints/huella4'
            sx={{
                top: '180px',
                left: '50px'
            }}
        />
        <EllipseImage
            n='pawprints/huella5'
            sx={{
                bottom: '50px',
                left: '90px'
            }}
        />
    </>
)

export default DogSectionPawprints
