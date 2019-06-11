const express = require('express');
const cluster = require('cluster');
const os = require('os');
const port = 4000;

const app = express();

/*
 * When the context is master, when called from the command line, we create new
 * processes equals to the number of cores on the system.
 */
if (cluster.isMaster) {

    var cpuCount = os.cpus().length;
    for (var i = 0; i < cpuCount; i += 1)
        cluster.fork();

    /*
     * To handle workers dying we listen for the `exit` event.
     */
    cluster.on('exit', function (worker) {
        console.log(`Worker ${worker.id} died`);
        cluster.fork();
    });
}

/**
 * When the context is worker, we listen on port 3000. Each new process created above
 * then listen on the same port, competing for new requests.
 */
if (cluster.isWorker) {

    const workerId = cluster.worker.id;

    app.set('json spaces', 2)
    app.get('/workers', function (req, res) {
        res.json(cluster.workers)
    });

    app.get('/', function (req, res) {
        setTimeout(() => {
            res.send(`Hello from worker ${workerId}`);
        }, 1000)
    });

    app.get('/error', function (req, res) {
        throw new Error("Test worker dying.");
    });

    const workerPort = port + Number(workerId)
    app.listen(workerPort, () => {
        console.log(`Worker ${workerId} listening on port ${workerPort}`)
    });
}