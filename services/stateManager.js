const states = {};
const requests = {};

function updateState(id, state) {

  if (!states[id]) {
    states[id] = [];
  }

  states[id].push({
    state,
    time: new Date()
  });

}

function saveRequest(hash, result) {
  requests[hash] = result;
}

function getRequest(hash) {
  return requests[hash];
}

function getStateHistory(id) {
  return states[id] || [];
}

module.exports = {
  updateState,
  saveRequest,
  getRequest,
  getStateHistory
};