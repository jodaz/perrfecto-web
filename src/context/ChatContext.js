import * as React from 'react'

const ChatContext = React.createContext()

const initialState = {
    users: [], // Connected users
    messages: [],
    receptor: null,
    isConnected: false,
    isLoading: false,
    isChatOpen: false
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
            case 'TOGGLE_LOADING': {
                return {
                    ...state,
                    isLoading: true
                }
            }
            case 'OPEN_CHAT': {
                return {
                    ...state,
                    receptor: action.payload.receptor,
                    messages: action.payload.messages,
                    isChatOpen: true
                }
            }
            case 'CLOSE_CHAT': {
                return {
                    ...state,
                    receptor: null,
                    messages: [],
                    isChatOpen: false
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
    dispatch({ type: 'TOGGLE_LOADING' })

    try {
        dispatch({
            type: 'FETCH_MESSAGES',
            payload: payload
        })
        dispatch({ type: 'TOGGLE_LOADING' })
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

async function openChat(dispatch, data) {
    dispatch({ type: 'TOGGLE_LOADING' })

    try {
        dispatch({
            type: 'OPEN_CHAT',
            payload: {
                receptor: data.user_1,
                messages: data.Messages
            }
        })
        dispatch({ type: 'TOGGLE_LOADING' })
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
    openChat,
    useChat,
    ChatProvider,
    ChatContext,
    updateConnectedStatus,
    setMessage,
    fetchMessages,
    deleteMessage
}
