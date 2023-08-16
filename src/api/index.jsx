import defaultAxios from 'axios';
import vars from '../vars'

const jsonInstance = defaultAxios.create({
    baseURL: vars.source,
    withCredentials: true
});

const blobInstance = defaultAxios.create({
    baseURL: vars.source,
    withCredentials: true,
    responseType: 'blob'
});

// Request interceptor
const interceptorsFunc = (config) => {
    const token = localStorage.getItem(vars.authToken);

    const newConfig = config;

    // When a 'token' is available set as token.
    if (token) {
        newConfig.headers['x-token'] = `${token}`;
    }

    return newConfig;
};

jsonInstance.interceptors.request.use(interceptorsFunc, (err) => Promise.reject(err));
blobInstance.interceptors.request.use(interceptorsFunc, (err) => Promise.reject(err));

export {
    jsonInstance as apiProvider,
    blobInstance as fileProvider
}
