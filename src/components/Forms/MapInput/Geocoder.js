import { useEffect } from "react";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import L from "leaflet";

export default function LeafletControlGeocoder({ province, city, setMarker, previousData }) {
    useEffect(() => {
        if (!!province && !!city) {
            const newLocation = `${province} ${city}`;

            if (previousData.current != newLocation) {
                var geocoder = L.Control.Geocoder.nominatim()

                geocoder.geocode(newLocation, results => {
                    if (results.length) {
                        setMarker(results[0].center)
                        previousData.current = newLocation
                    }
                })
            }
        }
    }, [province, city]);

    return null;
}
