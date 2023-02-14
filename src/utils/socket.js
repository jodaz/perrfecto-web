import vars from "../vars";
import socketIO from 'socket.io-client';

const socket = socketIO.connect(vars.source);

export const handleConnect = user => {
    socket.emit('conectar', {
        uid: user.id
    })
}

export const handleDisconnect = () => {
    socket.emit('disconnect')
}

export const emitMessage = ({
    id_chat,
    message,
    receiver
}) => {
    socket.emit('mensajePrivado', {
        mensaje: message,
        para: receiver,
        id_conversation: id_chat
    })
}
