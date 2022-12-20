import * as React from 'react'
import { apiProvider } from '../api'

const FavouriteContext = React.createContext()

const initialState = {
    items: [null]
}

function favouriteReducer(state, action) {
    if (action) {
        switch (action.type) {
            case 'FETCH_FAVORITES': {
                return {
                    ...state,
                    items: action.payload
                }
            }
            case 'ADD_FAVORITE': {
                return {
                    ...state,
                    items: [action.payload, ...state.items],
                }
            }
            case 'SEARCH_FAVORITE': {
                return {
                    ...state,
                    items: state.items.filter(item => item.Ad.publi.name.match(action.payload))
                }
            }
            case 'DELETE_FAVORITE': {
                return {
                    ...state,
                    items: state.items.filter(({ id }) => id != action.payload.id),
                }
            }
            default: {
                throw new Error(`Unhandled action type: ${action.type}`)
            }
        }
    }
}

function FavouriteProvider({ children }) {
    const [state, dispatch] = React.useReducer(favouriteReducer, initialState)

    return (
        <FavouriteContext.Provider value={{ state, dispatch }}>
            {children}
        </FavouriteContext.Provider>
    )
}

function useFavourites() {
    const context = React.useContext(FavouriteContext)

    if (context === undefined) {
        throw new Error('useFavourites must be used within a FavouriteProvider')
    }

    return context
}

async function addFavourite(dispatch, item) {
    try {
        const res = await apiProvider.post(`api/fav/new`, {
            ad_id: item.id
        })

        if (res.status >= 200 && res.status < 300) {
            dispatch({
                type: 'ADD_FAVORITE',
                payload: null
            })
            fetchFavourites(dispatch)
        }
    } catch (e) {
        console.log(e);
    }
}

/**
 * Delete favourite
 * @param {*} dispatch function
 * @param {*} item inside array
 */
async function deleteFavourite(dispatch, item) {
    try {
        const res = await apiProvider.delete(`api/fav/${item.id}`)

        if (res.status >= 200 && res.status < 300) {
            dispatch({
                type: 'DELETE_FAVORITE',
                payload: item
            })
        }

        return res;
    } catch (e) {
        console.log(e);
    }
}

async function fetchFavourites(dispatch) {
    try {
        const res = await apiProvider.get('api/fav/fav-user')

        if (res.status >= 200 && res.status < 300) {
            const { data: { data } } = res;

            dispatch({
                type: 'FETCH_FAVORITES',
                payload: data
            })
        }
    } catch (e) {
        console.log(e);
    }
}

async function searchFavourites(dispatch, search) {
    try {
        if (search) {
            dispatch({
                type: 'SEARCH_FAVORITE',
                payload: search
            })
        } else {
            fetchFavourites(dispatch);
        }
    } catch (e) {
        console.log(e)
    }
}

export {
    useFavourites,
    FavouriteProvider,
    deleteFavourite,
    FavouriteContext,
    addFavourite,
    searchFavourites,
    fetchFavourites
}
