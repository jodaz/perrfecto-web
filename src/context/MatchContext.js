import * as React from 'react'
import { apiProvider } from '../api'

const MatchContext = React.createContext()

const initialState = {
    open: false,
    matchPub: null
}

function matchReducer(state, action) {
    if (action) {
        switch (action.type) {
            case 'MATCH': {
                return {
                    ...state,
                    open: true,
                    matchPub: action.payload
                }
            }
            case 'UNMATCH': {
                return initialState
            }
            default: {
                throw new Error(`Unhandled action type: ${action.type}`)
            }
        }
    }
}

function MatchProvider({ children }) {
    const [state, dispatch] = React.useReducer(matchReducer, initialState)

    return (
        <MatchContext.Provider value={{ state, dispatch }}>
            {children}
        </MatchContext.Provider>
    )
}

function useMatch() {
    const context = React.useContext(MatchContext)

    if (context === undefined) {
        throw new Error('useMatch must be used within a MatchProvider')
    }

    return context
}

function unmatch(dispatch) {
    dispatch({
        type: 'UNMATCH'
    })
}

function match(dispatch, payload) {
    dispatch({
        type: 'MATCH',
        payload: payload
    })
}

export {
    useMatch,
    MatchProvider,
    MatchContext,
    match,
    unmatch
}
