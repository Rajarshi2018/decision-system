// const { v4: uuidv4 } = require("uuid");
// const crypto = require("crypto");

// const { processWorkflow } = require("../engines/workflowEngine");

// const {
//   updateState,
//   saveRequest,
//   getRequest
// } = require("../services/stateManager");

// const { logDecision } = require("../services/auditServices");


// exports.buisnessLogic = async (req, res) => {

//   const input = req.body;

//   // schema validation
//   if (typeof input.score !== "number") {
//     return res.status(400).json({ error: "score must be number" });
//   }

//   // idempotency
//   const hash = crypto
//     .createHash("sha256")
//     .update(JSON.stringify(input))
//     .digest("hex");

//   const existing = getRequest(hash);

//   if (existing) {
//     return res.json({
//         message: "Duplicate request detected",
//         existing,
//     });
//   }

//   const id = uuidv4();

//   updateState(id, "received");

//   const result = await processWorkflow(input);

//   updateState(id, "decision_made");

//   logDecision(id, result.ruleTriggered, result.decision);

//   const response = {
//     requestId: id,
//     decision: result.decision,
//     ruleTriggered: result.ruleTriggered
//   };

//   saveRequest(hash, response);

//   res.json(response);

// }

const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");

const { processWorkflow } = require("../engines/workflowEngine");

const {
  updateState,
  saveRequest,
  getRequest
} = require("../services/stateManager");

const { logDecision } = require("../services/auditServices");

exports.buisnessLogic = async (req, res) => {

  const input = req.body;

  const hash = crypto
    .createHash("sha256")
    .update(JSON.stringify(input))
    .digest("hex");

  const existing = getRequest(hash);

  if (existing) {
    return res.json({
      message: "Duplicate request detected",
      existing
    });
  }

  const id = uuidv4();

  updateState(id, "received");

  const result = await processWorkflow(input);

  updateState(id, "decision_made");

  logDecision(id, result.ruleTriggered, result.decision);

  const response = {
    requestId: id,
    decision: result.decision,
    ruleTriggered: result.ruleTriggered
  };

  saveRequest(hash, response);

  res.json(response);

};