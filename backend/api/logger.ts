import express from "express";

function loggerMiddleware(request, response, next) {
    let timeStart = new Date().getTime()
    console.log(`${timeStart} ${request.method} url: ${request.url}`);
    next()
}

export { loggerMiddleware }