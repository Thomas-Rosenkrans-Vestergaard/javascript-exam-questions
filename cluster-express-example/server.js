const express = require('express');
const request = require('request')
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
    const servers = [];
    for (var i = 1; i <= cpuCount; i += 1) {
        cluster.fork();
        servers.push(`http://localhost:${port + i}`)
    }

    console.log("Servers:")
    console.log(servers)

    let cur = 0;
    const handler = (req, res) => {
        req.pipe(request({ url: servers[cur] + req.url })).pipe(res);
        cur = (cur + 1) % servers.length;
    };

    const server = express().get('*', handler).post('*', handler);
    server.listen(port, err => {
        if(err){
            console.error(err);
            return;
        }

        console.log(`Load balancer started at http://localhost:${port}`)
    });
}

/**
 * When the context is worker, we listen on port 3000. Each new process created above
 * then listen on the same port, competing for new requests.
 */
if (cluster.isWorker) {

    const workerId = cluster.worker.id;
    
    app.get('/', function (req, res) {
        setTimeout(() => {
            res.send(`Hello from worker ${workerId}`);
        }, 1000)
    });

    const workerPort = port + Number(workerId)
    app.listen(workerPort, () => {
        console.log(`Worker ${workerId} listening on port ${workerPort}`)
    });
}