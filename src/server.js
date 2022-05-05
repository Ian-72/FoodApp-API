const os = require('os');
const cluster = require('cluster');
const App = require('./app');

const clusterWorkerSize = os.cpus().length;

const myApp = new App();

if (clusterWorkerSize > 1) {
  if (cluster.isMaster) {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < clusterWorkerSize; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker) => {
      console.log(`Worker ${worker.id} has exitted`);
    });
  } else {
    myApp.startServer();
  }
} else {
  myApp.startServer();
}
