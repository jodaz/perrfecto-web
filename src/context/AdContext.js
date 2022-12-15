import * as React from 'react'

const AdContext = React.createContext()

const initialState = {
    pictures: [],
    videos: [],
    certificates: [],
    vaccines: []
}

function adReducer(state, action) {
    if (action) {
        switch (action.type) {
            case 'ADD_PHOTO': {
                return {
                    ...state,
                    pictures: [...state.pictures, action.payload],
                }
            }
            case 'ADD_VACCINE': {
                return {
                    ...state,
                    vaccines: [...state.vaccines, action.payload],
                }
            }
            case 'ADD_CERTIFICATE': {
                return {
                    ...state,
                    certificates: [...state.certificates, action.payload],
                }
            }
            case 'DELETE_VACINNE': {
                return {
                    ...state,
                    vaccines: state.vaccines.filter((_, index) => index != action.payload),
                }
            }
            default: {
                throw new Error(`Unhandled action type: ${action.type}`)
            }
        }
    }
}

function AdProvider({ children }) {
    const [state, dispatch] = React.useReducer(adReducer, initialState)

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

async function addVaccine(dispatch, data) {
    try {
        dispatch({
            type: 'ADD_VACCINE',
            payload: data
        })
    } catch (e) {
        console.log(e);
    }
}

/**
 * Delete vaccine
 * @param {*} dispatch function
 * @param {*} index inside array
 */
async function deleteVaccine(dispatch, index) {
    try {
        dispatch({
            type: 'ADD_VACCINE',
            payload: index
        })
    } catch (e) {
        console.log(e);
    }
}

export {
    useAd,
    AdProvider,
    addPhoto,
    addVaccine,
    deleteVaccine,
    AdContext
}
