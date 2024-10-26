const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors"); 

const route = require('./routes')

const app = express();
const port = 8081;

app.use(express.urlencoded({
  extended: true
})) //form
app.use(express.json()) //json nhu fetch, axious

// HTTP logger
app.use(morgan("combined"))
app.use(cors())

require('./databases/init.mongodb')

// routes
app.use('/', require('./routes'))

// check 404 error
app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
})

app.use((err, req, res, next) => {
    const statusCode = err.status || 500
    return res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        message: err.message || "Internal Server Error",
    })
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
