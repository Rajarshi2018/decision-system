const { getLogsById } = require("../services/auditServices");

exports.getLogs = (req, res) => {

  const id = req.params.id;

  const logs = getLogsById(id);

  res.json(logs);

}