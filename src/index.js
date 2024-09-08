import app from './app.js'
import logger from './configs/logger.config.js';
import mongoose from 'mongoose';



//env varialbles
const PORT = process.env.PORT || 8000
const {DATABASE_URL} = process.env

//exit on mongoDB error
mongoose.connection.on('error', (err) => {
    logger.error(`MongoDB connection error: ${err}`)
    process.exit(1);
})

// mongodb debug mode
if(process.env.NODE_ENV !== "production" ) {
    mongoose.set("debug", true)
}

//mongoDB connection
mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    logger.info('Connected to MongoDB')
});

let server = app.listen(PORT, () => {
    logger.info(`Server is listening at ${PORT}.`);
    console.log("process id", process.pid);
});


//handle server errors

const exitHandler = () => {
    if (server) {
        logger.info('Server closed');
        process.exit(1);
    }
    else {
        process.exit(1);
    }
}


const unexpectedErrorHandler = (error) => {
    logger.error(error);
    exitHandler();
}
process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

//SIGTERM
process.on("SIGTERM", () => {
    if (server) {
        logger.info('Server closed');
        process.exit(1);
    }
})