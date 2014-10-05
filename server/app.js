var io      = require('socket.io');
var spawn   = require('child_process').spawn;
var log     = require('./lib/log');

var bash = spawn('bash');
var port  = 5678;

var socket = io.listen(port);
log('Socket listening on port %s', port)

bash.stdout.on('data', function(data) {
  socket.send(data.toString());
})

bash.stderr.on('data', function(data) {
  socket.send(data.toString());
})

socket.on('connection', function(client) {
  log('Client connected: %s', client.id);
  client.on('message', function(data) {
    log('Received message: %s', data);
    bash.stdin.write(data+'\n');
  });
});