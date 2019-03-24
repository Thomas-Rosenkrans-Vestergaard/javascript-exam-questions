const Mongod = require('mongod');

const server = new Mongod(27017);

server.open((err) => {
    if (err){
        console.error("Could not start mongo server")
        console.error(err)
    }

    console.log("Database started")
});