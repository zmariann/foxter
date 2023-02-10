import express from "express";

function loggerMiddleware(request, response, next) {
    let timeStart = new Date()
    console.log(`${timeStart.toISOString()} ${request.method} url: ${request.url}`);
    next()
}

export { loggerMiddleware }
