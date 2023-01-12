export function getMarkerPosition(watch, fallback) {
    const lat = watch('lat');
    const lng = watch('leng');

    if (lat && lng)

    return {
        lat: lat,
        lng: lng,
    };

    if (fallback) return fallback;

    return {
        lat: 0,
        lng: 0,
    };
}
