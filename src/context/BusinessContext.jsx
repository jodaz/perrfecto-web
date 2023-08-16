import * as React from 'react'
import { apiProvider } from '../api'

const BusinessContext = React.createContext()

const initialState = {
    selectedItem: null,
    publications: [],
    isLoaded: false,
    isLoading: false,
    openFilter: false
}

function publicationReducer(state, action) {
    if (action) {
        switch (action.type) {
            case 'FETCH_PUBLICATIONS': {
                return {
                    ...state,
                    publications: action.payload,
                    isLoading: false,
                    isLoaded: true
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
                    isLoading: true,
                    isLoaded: false,
                }
            }
            case 'SELECT_ITEM': {
                return {
                    ...state,
                    selectedItem: action.payload
                }
            }
            case 'RESET_ITEM': {
                return {
                    ...state,
                    selectedItem: null
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

function BusinessProvider({ children }) {
    const [state, dispatch] = React.useReducer(publicationReducer, initialState)

    return (
        <BusinessContext.Provider value={{ state, dispatch }}>
            {children}
        </BusinessContext.Provider>
    )
}

function useBusinesses() {
    const context = React.useContext(BusinessContext)

    if (context === undefined) {
        throw new Error('useBusinesses must be used within a BusinessContext')
    }

    return context
}

async function fetchBusinesses(dispatch, query) {
    try {
        dispatch({
            type: 'LOADING'
        })

        const res = await apiProvider.get('api/business-ann/anns-by-filter', {
            params: query
        })

        if (res.status >= 200 && res.status < 300) {
            const { data: { data: { data } } } = res;

            dispatch({
                type: 'FETCH_PUBLICATIONS',
                payload: data
            })

            return res;
        }
    } catch (e) {
        console.log(e);
    }
}

async function fetchByCategory(dispatch, query) {
    try {
        dispatch({
            type: 'LOADING'
        })

        const { category_id, ...restQuery } = query

        const res = await apiProvider.get(`/api/business-ann/anns/${category_id}`, {
            params: restQuery
        })

        if (res.status >= 200 && res.status < 300) {
            dispatch({
                type: 'FETCH_PUBLICATIONS',
                payload: res.data.data.data
            })

            return res;
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

async function selectItem(dispatch, data) {
    try {
        dispatch({
            type: 'SELECT_ITEM',
            payload: data
        })
    } catch (e) {
        console.log(e)
    }
}

async function resetItem(dispatch) {
    try {
        dispatch({
            type: 'RESET_ITEM'
        })
    } catch (e) {
        console.log(e)
    }
}

async function resetFilters(dispatch) {
    try {
        dispatch({
            type: 'RESET'
        })
    } catch (e) {
        console.log(e)
    }
}

export {
    useBusinesses,
    BusinessProvider,
    BusinessContext,
    toggleFilters,
    fetchBusinesses,
    resetFilters,
    selectItem,
    resetItem,
    fetchByCategory
}
