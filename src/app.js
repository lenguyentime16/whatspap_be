import express from "express";
import dotenv from 'dotenv';
import morgan from "morgan";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import compression from "compression";
import fileUpload from "express-fileupload";
import cors from "cors";
//dotenv config
dotenv.config();

// create express ap
const app = express();

//Morgan
if (process.env.NODE_ENV !== "production") {
    app.use(morgan("dev"))
}

//Helmet
app.use(helmet());

//Parse json request url
app.use(express.urlencoded({ extended: true }));


//Parse json request body
app.use(express.json());

//sanitize request data
app.use(mongoSanitize());

//Enable cookie parser
app.use(cookieParser());

//gzip compression
app.use(compression());

//file upload 
app.use(fileUpload({
    useTempFiles: true,
}))

//cors
app.use(cors())

app.post('/test', (req, res) => {
    res.send(req.body);
})


export default app;