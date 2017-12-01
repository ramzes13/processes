const { spawn } = require('child_process');
let processMeta = [];

function runProcess(processMeta, callback) {
  if (processMeta.callbackFunction) {
    processMeta.callbackFunction(callback);
  } else {
    const prc = spawn(processMeta.cmd, processMeta.args);
    prc.stdout.on('finish', callback);

    if (processMeta.afterStart) {
      processMeta.afterStart(prc);
    }
  }

}
function runAllProcess() {
  if (processesMeta.length > 0) {
    runProcess(processesMeta.pop(), runAllProcess);
  }
}

function runProcessMeta(meta, env, environments) {
  processesMeta = meta;

  if (environments.includes(env)) {
    processesMeta.reverse();
    runAllProcess();
  } else {
    process.stdout.write(`env "${env}" does not exist in the list [${environments.join(', ')}]`);
  }
}

['exit', 'SIGINT', 'uncaughtException', 'unhandledRejection'].forEach((event) => {
  process.on(event, (data) => {
    if (data) {
      process.stdout.write(data.toString());
    }
  });
});

module.exports = runProcessMeta