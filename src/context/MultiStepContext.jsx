import * as React from 'react'

const MultiStepContext = React.createContext()

const initialState = {}

function stepsReducer(state, action) {
    if (action) {
        switch (action.type) {
            case 'SAVE_STEP': {
                return {
                    ...state,
                    ...action.payload
                }
            }
            case 'CLEAR': {
                return initialState;
            }
            default: {
                throw new Error(`Unhandled action type: ${action.type}`)
            }
        }
    }
}

function MultiStepProvider({ children }) {
    const [state, dispatch] = React.useReducer(stepsReducer, initialState)

    return (
        <MultiStepContext.Provider value={{ state, dispatch }}>
            {children}
        </MultiStepContext.Provider>
    )
}

function useMultiStepForm() {
    const context = React.useContext(MultiStepContext)

    if (context === undefined) {
        throw new Error('useMultiStepForm must be used within a MultiStepProvider')
    }

    return context
}

async function saveStep(dispatch, payload) {
    try {
        dispatch({
            type: 'SAVE_STEP',
            payload: payload
        })
    } catch (e) {
        console.log(e);
    }
}

async function clearForm(dispatch) {
    try {
        dispatch({
            type: 'CLEAR'
        })
    } catch (e) {
        console.log(e);
    }
}

export {
    MultiStepProvider,
    MultiStepContext,
    useMultiStepForm,
    saveStep,
    clearForm
}
