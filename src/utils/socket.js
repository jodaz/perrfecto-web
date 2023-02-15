import vars from "../vars";
import socketIO from 'socket.io-client';

export const socket = socketIO.connect(vars.source);

export const handleConnect = (user, callback) => {
    socket.emit('conectar', {
        uid: user.id
    }, data => callback(data)) // Con esto obtengo los usuarios conectados
}

export const handleSetUserId = user => {
    socket.emit('setUserId', user.id)
}

export const handleDisconnect = () => {
    socket.on('disconnect', () => console.log("Estas desconectado"))
}

export const listenConnection = callback => {
    socket.on('listaPersona', data => callback(data))
}

export const listenMessages = callback => {
    socket.on('mensajePrivado', data => callback(data))
}

export const handleLogout = () => {
    socket.emit('desconectar')
}

export const emitMessage = ({
    id_chat,
    message,
    receiver,
    sender
}) => {
    socket.emit('mensajePrivado', {
        mensaje: message,
        uid: receiver,
        id_conversation: id_chat,
        sender: sender
    })
}
