import * as React from 'react'

const ChatContext = React.createContext()

const initialState = {
    users: [],
    messages: [],
    isConnected: false
}

function chatReducer(state, action) {
    if (action) {
        switch (action.type) {
            case 'SET_CONNECTED_STATUS': {
                return {
                    ...state,
                    users: action.payload,
                    isConnected: true
                }
            }
            case 'FETCH_MESSAGES': {
                return {
                    ...state,
                    messages: action.payload
                }
            }
            case 'DELETE_MESSAGE': {
                return {
                    ...state,
                    messages: state.messages.filter(({ id }) => id != action.payload.id)
                }
            }
            case 'SET_MESSAGE': {
                return {
                    ...state,
                    messages: [...state.messages, action.payload]
                }
            }
            default: {
                throw new Error(`Unhandled action type: ${action.type}`)
            }
        }
    }
}

function ChatProvider({ children }) {
    const [state, dispatch] = React.useReducer(chatReducer, initialState)

    return (
        <ChatContext.Provider value={{ state, dispatch }}>
            {children}
        </ChatContext.Provider>
    )
}

function useChat() {
    const context = React.useContext(ChatContext)

    if (context === undefined) {
        throw new Error('useChat must be used within a ChatProvider')
    }

    return context
}

async function updateConnectedStatus(dispatch, payload) {
    try {
        dispatch({
            type: 'SET_CONNECTED_STATUS',
            payload: payload
        })
    } catch (e) {
        console.log(e)
    }
}

async function fetchMessages(dispatch, payload) {
    try {
        dispatch({
            type: 'FETCH_MESSAGES',
            payload: payload
        })
    } catch (e) {
        console.log(e)
    }
}

async function setMessage(dispatch, payload) {
    try {
        dispatch({
            type: 'SET_MESSAGE',
            payload: payload
        })
    } catch (e) {
        console.log(e)
    }
}

async function deleteMessage(dispatch, payload){
    try {
        dispatch({
            type: 'DELETE_MESSAGE',
            payload: {
                id: payload
            }
        })
    } catch (e) {
        console.log(e)
    }
}

export {
    useChat,
    ChatProvider,
    ChatContext,
    updateConnectedStatus,
    setMessage,
    fetchMessages,
    deleteMessage
}
