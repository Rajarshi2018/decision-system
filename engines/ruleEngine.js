const rules = require("../config/rules.json");

function evaluateRules(input) {

  // mandatory check
  if (input.score === undefined) {
    return {
      decision: "reject",
      ruleTriggered: "missing_score"
    };
  }

  for (let rule of rules.rules) {

    const func = new Function("score", `return ${rule.condition}`);

    if (func(input.score)) {

      return {
        decision: rule.action,
        ruleTriggered: rule.name
      };

    }

  }

  return {
    decision: "manual_review",
    ruleTriggered: "default_rule"
  };

}

module.exports = evaluateRules;