import * as React from 'react'
import vars from '../vars'
import { apiProvider } from '../api'
import { handleConnect, handleLogout } from '../utils/socket'

const setLocalCredentials = async (token, data) => {
    await localStorage.setItem(vars.authToken, token)
    await localStorage.setItem(vars.user, JSON.stringify(data));

    return true;
}

const AuthContext = React.createContext()

const initialState = {
    isAuth: false,
    user: {},
    token: '',
    userCoords: null,
    openGeolocation: false
}

const getInitialState = () => {
    const localInitialState = { ...initialState };

    if (localStorage.getItem(vars.user)) {
        localInitialState.user = JSON.parse(localStorage.getItem(vars.user))
    }
    if (localStorage.getItem(vars.authToken)) {
        localInitialState.token = localStorage.getItem(vars.authToken);
        localInitialState.isAuth = true;
    }

    return localInitialState;
}

function authReducer(state, action) {
    if (action) {
        switch (action.type) {
            case 'LOGIN': {
                return {
                    ...state,
                    user: action.payload.user,
                    token: action.payload.token,
                    isAuth: true
                }
            }
            case 'GUEST': {
                return {
                    ...state,
                    user: action.payload.user,
                }
            }
            case 'TOGGLE_GEOLOCATION_DRAWER': {
                return {
                    ...state,
                    openGeolocation: !state.openGeolocation
                }
            }
            case 'SET_USER_COORDS': {
                return {
                    ...state,
                    userCoords: action.payload
                }
            }
            case 'RENEW_TOKEN': {
                return {
                    ...state,
                    user: action.payload.user,
                    token: action.payload.token,
                    isAuth: true
                }
            }
            case 'LOGOUT': {
                return initialState
            }
            default: {
                throw new Error(`Unhandled action type: ${action.type}`)
            }
        }
    }
}

function AuthProvider({ children }) {
    const [state, dispatch] = React.useReducer(authReducer, getInitialState())

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = React.useContext(AuthContext)

    if (context === undefined) {
        throw new Error('useAuth must be used within a AuthProvider')
    }

    return context
}

async function renewToken(dispatch, values) {
    try {
        const { id, name, role } = values;

        const res = await apiProvider.get('/api/auth/renew', {
            id: id,
            name: name,
            role: role
        });

        if (res.status >= 200 && res.status < 300) {
            const { data } = res

            dispatch({
                type: 'RENEW_TOKEN',
                payload: {
                    user: data.data,
                    token: data.token
                }
            })

            return await setLocalCredentials(data.token, data.data)
        }
    } catch (error) {
        console.log("renew token error ", error)
    }
}

async function loginUser(dispatch, values) {
    try {
        const { data, token } = values

        dispatch({
            type: 'LOGIN',
            payload: {
                user: data,
                token: token
            }
        })

        await handleConnect(data);
        await setLocalCredentials(token, data)
    } catch (e) {
        console.log(e);
    }
}

async function setUserCoords(dispatch, data) {
    try {
        dispatch({
            type: 'SET_USER_COORDS',
            payload: data
        })
    } catch (e) {
        console.log(e);
    }
}

async function guestUser(dispatch) {
    try {
        const data = {
            role: 'guest'
        }

        dispatch({
            type: 'GUEST',
            payload: {
                user: data
            }
        });

        await localStorage.setItem(vars.user, JSON.stringify(data));
    } catch (e) {
        console.log(e);
    }
}

async function logout(dispatch) {
    try {
        dispatch({ type: 'LOGOUT' })

        await localStorage.removeItem(vars.authToken)
        await localStorage.removeItem(vars.user);
        await handleLogout()
    } catch (e) {
        console.log(e);
    }
}

async function toggleGeolocation(dispatch) {
    try {
        dispatch({ type: 'TOGGLE_GEOLOCATION_DRAWER' })
    } catch (e) {
        console.log(e)
    }
}

export {
    useAuth,
    toggleGeolocation,
    AuthProvider,
    loginUser,
    logout,
    guestUser,
    renewToken,
    setUserCoords
}
