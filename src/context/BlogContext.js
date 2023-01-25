import * as React from 'react'
import { apiProvider } from '../api'

const BlogContext = React.createContext()

const initialState = {
    items: [null],
    is_searching: false,
    openFilter: false
}

function blogReducer(state, action) {
    if (action) {
        switch (action.type) {
            case 'FETCH_BLOGS': {
                return {
                    ...state,
                    items: action.payload,
                    is_searching: false
                }
            }
            case 'LOADING': {
                return {
                    ...state,
                    items: [action.payload, ...state.items],
                    is_searching: false
                }
            }
            case 'SEARCH_BLOG': {
                return {
                    ...state,
                    items: filterBlogs(state.items, action.payload),
                    is_searching: true
                }
            }
            case 'TOGGLE_FILTERS': {
                return {
                    ...state,
                    openFilter: !state.openFilter
                }
            }
            case 'DELETE_BLOG': {
                return {
                    ...state,
                    items: state.items.filter(({ id }) => id != action.payload.id),
                    is_searching: false
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

function BlogProvider({ children }) {
    const [state, dispatch] = React.useReducer(blogReducer, initialState)

    return (
        <BlogContext.Provider value={{ state, dispatch }}>
            {children}
        </BlogContext.Provider>
    )
}

function useBlogs() {
    const context = React.useContext(BlogContext)

    if (context === undefined) {
        throw new Error('useBlogs must be used within a BlogProvider')
    }

    return context
}

async function fetchBlogs(dispatch) {
    try {
        const res = await apiProvider.get('/api/blog/blog-by-uid')

        if (res.status >= 200 && res.status < 300) {
            const { data: { data: { data } } } = res;

            dispatch({
                type: 'FETCH_BLOGS',
                payload: data
            })
        }
    } catch (e) {
        console.log(e);
    }
}

async function searchBlogs(dispatch, search) {
    try {
        if (search) {
            dispatch({
                type: 'SEARCH_BLOG',
                payload: search
            })
        } else {
            fetchBlogs(dispatch);
        }
    } catch (e) {
        console.log(e)
    }
}

/**
 * items: state
 * payload: parameters for filtering
 * @param {*} values
 */
async function filterBlogs(items, payload, dispatch) {
    try {
        let newItems = items;

        if (payload.search) {
            newItems = items.filter(item => item.title.match(payload.search))
        }

        dispatch({
            type: 'FETCH_BLOGS',
            payload: newItems
        })
    } catch (e) {
        console.log()
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

async function resetFilters(dispatch) {
    try {
        dispatch({
            type: 'RESET'
        })
        fetchBlogs(dispatch)
    } catch (e) {
        console.log(e)
    }
}

export {
    toggleFilters,
    useBlogs,
    BlogProvider,
    BlogContext,
    searchBlogs,
    fetchBlogs,
    resetFilters
}
