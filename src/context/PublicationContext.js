import * as React from 'react'
import { apiProvider } from '../api'

const PublicationContext = React.createContext()

const initialState = {
    publications: [],
    is_searching: false,
    openFilter: false
}

function publicationReducer(state, action) {
    if (action) {
        switch (action.type) {
            case 'FETCH_PUBLICATIONS': {
                return {
                    ...state,
                    publications: action.payload,
                    is_searching: false
                }
            }
            case 'TOGGLE_FILTERS': {
                return {
                    ...state,
                    openFilter: !state.openFilter
                }
            }
            case 'LOADING': {
                return {
                    ...state,
                    publications: [action.payload, ...state.publications],
                    is_searching: false
                }
            }
            default: {
                throw new Error(`Unhandled action type: ${action.type}`)
            }
        }
    }
}

function PublicationProvider({ children }) {
    const [state, dispatch] = React.useReducer(publicationReducer, initialState)

    return (
        <PublicationContext.Provider value={{ state, dispatch }}>
            {children}
        </PublicationContext.Provider>
    )
}

function usePublications() {
    const context = React.useContext(PublicationContext)

    if (context === undefined) {
        throw new Error('usePublications must be used within a PublicationProvider')
    }

    return context
}

async function fetchPublications(dispatch) {
    try {
        const res = await apiProvider.get('api/publication/publications')

        if (res.status >= 200 && res.status < 300) {
            const { data: { data } } = res;

            dispatch({
                type: 'FETCH_PUBLICATIONS',
                payload: data
            })
        }
    } catch (e) {
        console.log(e);
    }
}

async function toggleFilters(dispatch) {
    try {
        dispatch({
            type: 'TOGGLE_FILTERS'
        })
    } catch (e) {
        console.log(e);
    }
}

export {
    usePublications,
    PublicationProvider,
    PublicationContext,
    toggleFilters,
    fetchPublications
}
