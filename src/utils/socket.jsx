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

export const deleteMessage = ({
    message,
    sender
}) => {
    socket.emit('deleteMessage', {
        messageId: message,
        uid: sender
    }, res => console.log(res))
}

export const likeBlog = ({
    blog,
    user
}) => {
    return new Promise((resolve, reject) => {
        socket.emit('likeBlog', {
            blog_id: blog,
            uid: user
        }, res => console.log(res))

        socket.on("likeBlog", (data) => {
            resolve(data);
        })
    });
}

export const likeCommentBlog = ({
    comment,
    user
}) => {
    return new Promise((resolve, reject) => {
        socket.emit('likeCommentaryBlog', {
            commentary_id: comment,
            uid: user
        }, res => console.log(res))

        socket.on("likeCommentaryBlog", (data) => {
            resolve(data);
        })
    });
}

export const likeReply = ({
    reply,
    user
}) => {
    return new Promise((resolve, reject) => {
        socket.emit('likeReplyBlog', {
            reply_id: reply,
            uid: user
        }, res => console.log(res))

        socket.on("likeReplyBlog", (data) => {
            resolve(data);
        })
    });
}

export const commentBlog = ({
    blog,
    user,
    msg
}) => {
    return new Promise((resolve, reject) => {
        socket.emit('commentBlog', {
            blog_id: blog,
            uid: user,
            msg: msg
        }, res => console.log(res))

        socket.on("commentBlog", (data) => {
            resolve(data);
        })
    });
}

export const reportUser = reportData => {
    return new Promise((resolve, reject) => {
        socket.emit('reportUser', reportData, res => console.log(res))

        socket.on("reportUser", (data) => {
            resolve(data);
        })
    });
}

export const replyComment = ({
    comment,
    user,
    msg
}) => {
    return new Promise((resolve, reject) => {
        socket.emit('replyCommentary', {
            commentary_id: comment,
            uid: user,
            msg: msg
        }, res => console.log(res))

        socket.on("replyCommentary", (data) => {
            resolve(data);
        })
    });
}
