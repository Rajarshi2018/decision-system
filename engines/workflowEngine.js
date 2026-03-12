// const evaluateRules = require("./ruleEngine");
// const retryVerify = require("../utils/externalServices");

// async function processWorkflow(input) {

//   // Step 1: evaluate rules
//   const result = evaluateRules(input);

//   // Step 2: external dependency check
//   try {

//     console.log("Calling external service...");
//     await retryVerify();

//   } catch (err) {

//     console.log("External service failed");

//     return {
//       decision: "retry",
//       ruleTriggered: "external_service_failure"
//     };

//   }

//   // Step 3: return decision
//   return {
//     decision: result.decision,
//     ruleTriggered: result.ruleTriggered
//   };

// }

// module.exports = {
//   processWorkflow
// };

const evaluateRules = require("./ruleEngine");
const retryVerify = require("../utils/externalServices");
const workflow = require("../config/workflow.json");

async function processWorkflow(input) {

  let ruleResult = null;

  for (let stage of workflow.stages) {

    if (stage === "validate") {

      if (typeof input.score !== "number") {
        return {
          decision: "reject",
          ruleTriggered: "invalid_input"
        };
      }

    }

    if (stage === "rules") {

      ruleResult = evaluateRules(input);

      if (ruleResult.decision === "reject") {
        return ruleResult;
      }

    }

    if (stage === "external") {

      try {

        await retryVerify();

      } catch (err) {

        return {
          decision: "retry",
          ruleTriggered: "external_service_failure"
        };

      }

    }

    if (stage === "decision") {

      return {
        decision: ruleResult.decision,
        ruleTriggered: ruleResult.ruleTriggered
      };

    }

  }

}

module.exports = {
  processWorkflow
};