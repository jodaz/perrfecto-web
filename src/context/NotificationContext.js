import * as React from 'react'
import { apiProvider } from '../api'

const NotificationContext = React.createContext()

const initialState = {
    items: [],
    isLoading: false
}

function notificationReducer(state, action) {
    if (action) {
        switch (action.type) {
            case 'FETCH_NOTIFICATIONS': {
                return {
                    ...state,
                    items: action.payload
                }
            }
            case 'NEW_NOTIFICATION': {
                return {
                    ...state,
                    items: [action.payload, ...state.items]
                }
            }
            case 'TOGGLE_LOADING': {
                return {
                    ...state,
                    isLoading: !state.isLoading
                }
            }
            case 'RESET': {
                return initialState
            }
            default: {
                throw new Error(`Unhandled action type: ${action.type}`)
            }
        }
    }
}

function NotificationProvider({ children }) {
    const [state, dispatch] = React.useReducer(notificationReducer, initialState)

    return (
        <NotificationContext.Provider value={{ state, dispatch }}>
            {children}
        </NotificationContext.Provider>
    )
}

function toggleLoading(dispatch) {
    dispatch({
        type: 'TOGGLE_LOADING'
    })
}

function useNotifications() {
    const context = React.useContext(NotificationContext)

    if (context === undefined) {
        throw new Error('useNotifications must be used within a NotificationProvider')
    }

    return context
}

function newNotification(dispatch, payload) {
    return dispatch({
        type: 'NEW_NOTIFICATION',
        payload: payload
    })
}

async function fetchNotifications(dispatch, query) {
    toggleLoading(dispatch) // update to true

    try {
        const response = await apiProvider.get('/api/notification/get-notifications', {
            params: query
        })

        if (response.status >= 200 && response.status < 300) {
            const { data: { data } } = response;

            toggleLoading(dispatch) // update to false
            dispatch({
                type: 'FETCH_NOTIFICATIONS',
                payload: data
            })
        }
    } catch (e) {
        console.log(e);
    }
}

export {
    useNotifications,
    NotificationProvider,
    NotificationContext,
    fetchNotifications,
    newNotification
}
