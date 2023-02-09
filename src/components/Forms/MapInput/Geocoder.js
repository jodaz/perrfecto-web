import { useEffect } from "react";
import { useMap } from "react-leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import L from "leaflet";

export default function LeafletControlGeocoder({ province, city }) {
    const map = useMap();

    useEffect(() => {
        if (province && city) {
            var geocoder = L.Control.Geocoder.nominatim()

            geocoder.geocode(`${province} ${city}`, results => {
                if (results) {
                    L.marker(results[0].center)
                        .bindPopup(results[0].name)
                        .addTo(map)
                        .openPopup();
                }
            })
        }
    }, [province, city]);

    return null;
}
