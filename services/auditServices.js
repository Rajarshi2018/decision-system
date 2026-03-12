const logs = [];

function logDecision(id, rule, decision) {

  logs.push({
    requestId: id,
    rule,
    decision,
    timestamp: new Date()
  });

}

function getLogsById(id) {
  return logs.filter(log => log.requestId === id);
}

module.exports = {
  logDecision,
  getLogsById
};