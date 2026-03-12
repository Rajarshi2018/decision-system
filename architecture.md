# System Architecture – Configurable Workflow Decision Platform

# System Architecture

Client
 ↓
Express API
 ↓
Controller
 ↓
Workflow Engine
 ↓
Rule Engine
 ↓
External Dependency
 ↓
State Manager
 ↓
Audit Logger

## Workflow Pipeline

validate → rules → external → decision

## 1. Introduction

This document describes the architecture of the **Configurable Workflow Decision System**.  
The system is designed to process incoming requests, evaluate configurable rules, execute workflow decisions, maintain lifecycle state, and generate audit logs.

The architecture focuses on:

- modular design
- configurable rule evaluation
- auditability
- failure handling
- extensibility

The platform is implemented using **Node.js and Express.js**.

---

# 2. Architectural Goals

The system is designed with the following goals:

1. **Configurability**
   - Rules and workflows should be modifiable without major code changes.

2. **Separation of Concerns**
   - Each component handles a specific responsibility.

3. **Auditability**
   - Every decision must be traceable.

4. **Fault Tolerance**
   - The system should handle failures gracefully.

5. **Scalability**
   - The architecture should support scaling in production environments.

---

# 3. High-Level Architecture

The system follows a layered architecture.


Client
|
v
REST API (Express Router)
|
v
Controllers / Business Logic
|
v
Workflow Engine
|
v
Rule Engine
|
v
State Manager + Audit Service
|
v
Configuration Files


---

# 4. System Components

## 4.1 API Layer

The API layer is responsible for receiving and validating client requests.

Location:


routes/workflowRoutes.js


Responsibilities:

- Accept HTTP requests
- Validate request schema
- Forward requests to workflow engine
- Return responses to client

Example API endpoint:


POST /workflow/process


---

## 4.2 Controllers / Business Logic

Controllers orchestrate business operations between API routes and system engines.

Location:


controllers/businessLogic.js
controllers/getLogs.js


Responsibilities:

- process business workflows
- retrieve audit logs
- manage interactions between services

---

## 4.3 Workflow Engine

The workflow engine controls the overall decision process.

Location:


engines/workflowEngine.js


Responsibilities:

- orchestrate workflow steps
- invoke rule evaluation
- return final decision outcome

Workflow steps:


Request Received
↓
Rules Evaluation
↓
Decision Generation


---

## 4.4 Rule Engine

The rule engine evaluates business rules defined in configuration files.

Location:


engines/ruleEngine.js


Responsibilities:

- load rules from configuration
- evaluate conditions
- determine decision outcome

Example rules:


score > 70 → approve
score < 40 → reject
40–70 → manual review


Rules are stored in:


config/rules.json


This allows dynamic rule updates without code changes.

---

## 4.5 State Manager

The state manager tracks lifecycle states of requests.

Location:


services/stateManager.js


Responsibilities:

- maintain request state history
- store request lifecycle transitions
- manage idempotency

Example state history:


received
decision_made


---

## 4.6 Audit Service

The audit service records decision traces.

Location:


services/auditServices.js


Responsibilities:

- store rule triggered
- store decision outcome
- record timestamp

Example audit log:


Request ID: abc123
Rule: high_score
Decision: approve
Timestamp: 2026-03-20


---

## 4.7 External Dependency Simulator

To simulate real-world system dependencies, an external service module is included.

Location:


utils/externalServices.js


Responsibilities:

- simulate third-party service failures
- test system resilience
- support retry logic

Example scenario:


Document verification service
Credit score API
Fraud detection system


The simulator randomly fails to mimic unreliable external APIs.

---

# 5. Data Flow

The request lifecycle follows this sequence:


Client Request
|
v
API Route
|
v
Input Validation
|
v
Workflow Engine
|
v
Rule Engine
|
v
Decision Generated
|
v
State Updated
|
v
Audit Log Stored
|
v
Response Returned


---

# 6. Request Lifecycle Example

Example input:


POST /workflow/process


Request body:

```json
// {
//   "score": 85
// }

Processing flow:

1 Request received
2 Schema validation
3 Rule evaluation
4 Decision generation
5 State update
6 Audit logging
7 Response returned

Response:

// {
//   "requestId": "abc123",
//   "decision": "approve",
//   "ruleTriggered": "high_score"
// }
7. Idempotency Handling

The system ensures idempotent behavior for duplicate requests.

Approach:

request payload is hashed

hash is stored in memory

duplicate requests return previous response

Example:

Request A → processed
Request A again → cached response returned

This prevents duplicate processing.

8. Failure Handling

The system handles several failure scenarios:

Input Validation Failure

Example:

score = "abc"

Response:

400 Bad Request
External Dependency Failure

External services may fail randomly.

Example:

document verification failure

The system simulates this to test reliability.

Duplicate Requests

Duplicate requests are handled using idempotency logic.

9. Configuration Model

Rules are stored in JSON configuration.

Location:

config/rules.json

Example:

// {
//   "rules": [
//     {
//       "name": "high_score",
//       "condition": "score > 70",
//       "action": "approve"
//     },
//     {
//       "name": "low_score",
//       "condition": "score < 40",
//       "action": "reject"
//     }
//   ]
// }

Benefits:

dynamic rule updates

no code redeployment required

10. Scaling Considerations

For production deployment, several improvements can be implemented.

10.1 Load Balancing

Multiple API servers can run behind a load balancer.

Client
   |
Load Balancer
   |
Multiple API Servers
10.2 Distributed Storage

In production, in-memory storage should be replaced with:

Redis
PostgreSQL
MongoDB

For:

audit logs

state tracking

idempotency

10.3 Message Queue

Workflow processing can be moved to asynchronous workers.

Example tools:

Kafka
RabbitMQ
AWS SQS

This improves system scalability.

11. Design Trade-offs
Decision	Reason
In-memory storage	Faster prototype development
JSON rule configuration	Enables dynamic rules
Modular architecture	Improves maintainability
12. Security Considerations

Possible improvements:

request authentication

input sanitization

rate limiting

API gateway integration

13. Future Improvements

Potential enhancements include:

dynamic workflow configuration

rule editor UI

database persistence

distributed workflow engine