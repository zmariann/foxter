import express from "express";

const loggerApp = express()

function logger(request, response, next) {
    console.log(`${request.method} url: ${request.url}`);
    next()
}

loggerApp.use(logger)

export { loggerApp }