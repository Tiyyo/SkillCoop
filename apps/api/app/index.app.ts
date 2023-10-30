// import path from 'path';
import express from 'express';
import cors from 'cors';
import router from './router/main.router';
import accessHttp from './middleware/acces-http';
import cookieParser from 'cookie-parser';
// import * as url from 'url';


// const dirname = url.fileURLToPath(new URL('.', import.meta.url));
const app: express.Application = express();

app.use(accessHttp);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
app.use(router);

export default app;