const isConnectedUser = (arrUsers, user) =>
    arrUsers.find(({ uid }) => user.id == uid)

export default isConnectedUser
