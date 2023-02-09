import express from "express";

const loggerApp = express()

function logger(request, response, next) {
    let timeStart = new Date().getTime()
    console.log(`${timeStart} ${request.method} url: ${request.url}`);
    next()
}

loggerApp.use(logger)

export { loggerApp }