import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "swiper/css/scrollbar";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    // <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    // </React.StrictMode>
);
