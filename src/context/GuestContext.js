import * as React from 'react'

const GuestContext = React.createContext()

const initialState = {
    isOpen: false,
    message: ''
}

function guestReducer(state, action) {
    if (action) {
        switch (action.type) {
            case 'OPEN': {
                return {
                    ...state,
                    isOpen: true,
                    message: action.payload
                }
            }
            case 'CLOSE': {
                return initialState;
            }
            default: {
                throw new Error(`Unhandled action type: ${action.type}`)
            }
        }
    }
}

function GuestProvider({ children }) {
    const [state, dispatch] = React.useReducer(guestReducer, initialState)

    return (
        <GuestContext.Provider value={{ state, dispatch }}>
            {children}
        </GuestContext.Provider>
    )
}

function useGuest() {
    const context = React.useContext(GuestContext)

    if (context === undefined) {
        throw new Error('useGuest must be used within a GuestProvider')
    }

    return context
}

async function openGuestWarning(dispatch, payload) {
    try {
        dispatch({
            type: 'OPEN',
            payload: payload
        })
    } catch (e) {
        console.log(e);
    }
}

async function closeGuestWarning(dispatch) {
    try {
        dispatch({
            type: 'CLOSE'
        })
    } catch (e) {
        console.log(e);
    }
}

export {
    useGuest,
    GuestProvider,
    openGuestWarning,
    closeGuestWarning
}
