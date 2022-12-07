import * as React from 'react'

const AdContext = React.createContext()

const initialState = {
    pictures: [],
    videos: [],
    certificates: [],
    vaccines: []
}

function authReducer(state, action) {
    if (action) {
        switch (action.type) {
            case 'ADD_PHOTO': {
                return {
                    ...state,
                    pictures: [...state.pictures, action.payload],
                }
            }
            default: {
                throw new Error(`Unhandled action type: ${action.type}`)
            }
        }
    }
}

function AdProvider({ children }) {
    const [state, dispatch] = React.useReducer(authReducer, initialState)

    return (
        <AdContext.Provider value={{ state, dispatch }}>
            {children}
        </AdContext.Provider>
    )
}

function useAd() {
    const context = React.useContext(AdContext)

    if (context === undefined) {
        throw new Error('useAd must be used within a AdProvider')
    }

    return context
}

async function addPhoto(dispatch, data) {
    try {
        dispatch({
            type: 'ADD_PHOTO',
            payload: data
        })
    } catch (e) {
        console.log(e);
    }
}

export { useAd, AdProvider, addPhoto }
