var LOG_LEVEL = "debug";

module.exports = function log() {
  if (LOG_LEVEL === 'debug') {
    console.log.apply(null, arguments);
  }
}