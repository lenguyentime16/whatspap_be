import app from './app.js'
import logger from './configs/logger.config.js';




//env varialbles
const PORT = process.env.PORT || 8000



let server = app.listen(PORT, () => {
    logger.info(`Server is listening at ${PORT}....`);
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