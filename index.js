const server = require('./server');

const port = 8090;

server.listen(port, () => {
    console.log(`\nAPI is running strong on port ${port}\n`)
})