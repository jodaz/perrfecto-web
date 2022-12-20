import * as React from 'react'
import { apiProvider } from '../api'

const FavouriteContext = React.createContext()

const initialState = {
    items: [null]
}

function favouriteReducer(state, action) {
    if (action) {
        switch (action.type) {
            case 'FETCH_FAVOURITES': {
                return {
                    ...state,
                    items: action.payload
                }
            }
            case 'DELETE_FAVOURITE': {
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
            fetchFavourites(dispatch)
        }
    } catch (e) {
        console.log(e);
    }
}

/**
 * Delete favourite
 * @param {*} dispatch function
 * @param {*} index inside array
 */
async function deleteFavourite(dispatch, item) {
    try {
        const res = await apiProvider.delete(`api/fav/${item.id}`)

        if (res.status >= 200 && res.status < 300) {
            dispatch({
                type: 'DELETE_FAVOURITE',
                payload: item
            })
        }

        return res;
    } catch (e) {
        console.log(e);
    }
}

async function fetchFavourites(dispatch) {
    dispatch({
        type: 'FETCH_FAVOURITES',
        payload: [null]
    })

    try {
        const res = await apiProvider.get('api/fav/fav-user')

        if (res.status >= 200 && res.status < 300) {
            const { data: { data } } = res;

            dispatch({
                type: 'FETCH_FAVOURITES',
                payload: data
            })
        }
    } catch (e) {
        console.log(e);
    }
}

export {
    useFavourites,
    FavouriteProvider,
    deleteFavourite,
    FavouriteContext,
    addFavourite,
    fetchFavourites
}
