const cluster = require('cluster');
const os = require('os');

const WORKERS = process.env.WEB_CONCURRENCY || os.cpus().length;
if (cluster.isMaster) {
    for (let i = 0; i < WORKERS; i++) {
        cluster.fork();
    }

    cluster.on('online', function(worker) {
        console.log('Worker ' + worker.process.pid + ' is online');
    });

    cluster.on('exit', function(worker, code, signal) {
        console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
        console.log('Starting a new worker');
        cluster.fork();
    });
} else {
    require('./server');
}
