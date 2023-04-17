import * as React from 'react';

export function useGeolocation() {
    const [coords, setCoords] = React.useState(null)
    const [error, setError] = React.useState(null)
    const [isGeolocationAvailable, setIsGeolocationAvailable] = React.useState(null)
    const [isGeolocationEnabed, setIsGeolocationEnabed] = React.useState(null)

    const geolocationAPI = navigator.geolocation;

    const getPosition = () => {
        if (!geolocationAPI) {
            setIsGeolocationAvailable(false)
            setIsGeolocationEnabed(true)
        } else {
            geolocationAPI.getCurrentPosition((position) => {
                const { coords } = position;

                setCoords({
                    latitude: coords.latitude,
                    longitude: coords.longitude
                })

                setIsGeolocationEnabed(true)
                setIsGeolocationAvailable(false)
            }, (error) => {
                setError(error)
                setIsGeolocationAvailable(false)
                setIsGeolocationEnabed(false)
            })
        }
    }

    // React.useEffect(() => { getPosition() }, []);

    return ({ coords, error, isGeolocationAvailable, isGeolocationEnabed, getPosition });
}
