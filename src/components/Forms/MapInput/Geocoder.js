import { useEffect } from "react";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import L from "leaflet";

export default function LeafletControlGeocoder({ province, city, setMarker }) {
    useEffect(() => {
        if (province && city) {
            var geocoder = L.Control.Geocoder.nominatim()

            geocoder.geocode(`${province} ${city}`, results => {
                if (results) {
                    setMarker(results[0].center)
                }
            })
        }
    }, [province, city]);

    return null;
}
