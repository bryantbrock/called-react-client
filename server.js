const express = require('express')
const http = require('http')
const path = require('path')

let app = express()

app.use(express.static(path.join(__dirname, 'build')))

const port = process.env.PORT || '8080'
const server = http.createServer(app)

app.set('port', port)

server.listen(port, () => console.log(`Running on localhost:${port}`))