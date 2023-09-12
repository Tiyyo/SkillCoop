// import path from 'path';
import express from 'express';
import cors, { CorsOptions } from 'cors';
import router from './router/main.router';
import accesHttp from './middleware/acces-http';
import cookieParser from 'cookie-parser';
// import * as url from 'url';


// const dirname = url.fileURLToPath(new URL('.', import.meta.url));

const app: express.Application = express();

app.use(accesHttp)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


// Cors should not be used that way in production
// the corsOptions should be set to the origin of the client    
// app.use(cors(corsOptions))


app.use(cors({ credentials: true, origin: "http://localhost:5173" }))

app.use(router)


export default app