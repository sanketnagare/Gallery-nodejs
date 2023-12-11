import express, {Request, Response} from "express";
import { dbconnect } from "./config/database.js";
import dotenv from 'dotenv'
import fileUpload from "express-fileupload";
import fileRoutes from './routers/fileRoutes.js'
import cors from 'cors';
import path from "path";

import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();

// middlewares
app.use(express.json())

// Serve static files
app.use('/files', express.static(path.join(__dirname, 'files')));

app.use(cors())

app.use(fileUpload(
    {
        useTempFiles : true,
        tempFileDir : '/tmp/'
    }
))

const port = process.env.PORT

// connecting to db
dbconnect();


// Routes
app.use('/api/v1/upload', fileRoutes)

app.listen(port, ()=> {
    console.log(`Server started at ${port}`)
    // console.log(path.join(__dirname, 'files'))
})