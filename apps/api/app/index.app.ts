// import path from 'path';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './router/main.router';
import accesHttp from './middleware/acces-http';
// import * as url from 'url';


// const dirname = url.fileURLToPath(new URL('.', import.meta.url));
const app: express.Application = express();


app.use(accesHttp);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ credentials: true, origin: ["http://13.37.229.142:5004", "http://localhost:5004"] }));
app.use(router);

export default app;