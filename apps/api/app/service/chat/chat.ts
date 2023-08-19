
import { Server } from 'socket.io'
import logger from "../../helpers/logger.ts"
import { getHistory, storeHistory } from './history.ts'

const init = async (server, options) => {
    // get history from redis   
    // just one room for now so we can fetch all the history at start
    const history = await getHistory('history')

    const io = new Server(server, options)

    io.on('connection', (socket) => {
        logger.info("A new user has logged in")
        socket.emit('history', history);

        socket.on('username', (username: string, userId: string) => {
            socket.data.username = username
            socket.data.userId = userId
        })

        socket.on('user_sent_message', (message: string, avatar: string) => {
            const infos = {
                username: socket.data.username,
                userId: socket.data.userId,
                socketId: socket.id,
                message: message,
                date: new Date(),
                avatar: avatar
            }
            console.log(infos)
            io.emit('message_has_been_sent', infos)

            // push infos to history with redis
            // one room for now so no need to have diffrent history
            storeHistory(infos, 'history')

        })
    })
}

export default init