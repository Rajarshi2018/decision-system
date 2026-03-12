# Workflow Decision System

Installation

git clone <repo>
cd decision-system
npm install
node app.js

# Configurable Workflow Decision Platform

This project implements a configurable workflow decision system capable of handling business decision pipelines.

## Workflow Stages

validate → rules → external → decision

## Features

- Configurable rule engine
- Multi-stage workflow engine
- Idempotency handling
- Retry mechanism
- Audit logging
- State lifecycle tracking

## API

POST /workflow/process
GET /workflow/audit/:id

## Example Request

{
 "score": 85
}

## Example Response

{
 "requestId": "...",
 "decision": "approve",
 "ruleTriggered": "high_score"
}

## Overview

This project implements a **Configurable Workflow Decision Platform** capable of processing incoming requests, evaluating business rules, executing workflow stages, maintaining lifecycle state, and generating audit logs.

The system is designed to simulate real-world business workflows such as:

- Application approval
- Vendor approval
- Claim processing
- Document verification
- Employee onboarding

The platform is built using **Node.js and Express.js** and follows a modular component-based architecture.

---

# System Architecture

The system processes requests through multiple layers:

Client Request  
↓  
REST API (Express.js)  
↓  
Workflow Engine  
↓  
Rule Engine  
↓  
State Manager  
↓  
Audit Logger  

The architecture ensures separation of concerns and modularity.

---

# Key Features

## 1 Input Intake

The system accepts structured JSON input through REST APIs and validates request schema.

Example request:


POST /workflow/process


```json
{
  "score": 85
}

Validation ensures the input follows expected schema.

2 Rules Evaluation

Business rules are evaluated using a configurable rule engine.

Rules include:

Mandatory field checks

Threshold-based decisions

Conditional branching

Multi-step evaluation

Example rules:

score > 70  → approve
score < 40  → reject
40–70       → manual review

Rules are stored in:

config/rules.json

This enables rule updates without changing application code.

3 Workflow Execution

The workflow engine orchestrates the decision-making process.

Possible workflow outcomes:

Approve

Reject

Manual Review

Workflow execution steps:

Request Received
↓
Rules Evaluation
↓
Decision Generation
4 State Management

The system tracks lifecycle states for each request.

Example state history:

received
decision_made

State history allows full traceability of request processing.

5 Audit Logging

Every decision made by the system is recorded with:

Request ID

Rule triggered

Decision

Timestamp

Audit logs allow full explainability of system decisions.

API endpoint:

GET /workflow/audit/:id
6 Failure Handling

The system includes mechanisms for handling failures:

Duplicate request detection

Idempotency handling

External dependency simulation

Duplicate requests return previously processed responses.

7 External Dependency Simulation

A mock external service simulates real-world API failures.

File:

utils/externalServices.js

The service randomly fails to simulate unreliable external systems.

This helps test retry and resilience mechanisms.

8 Configurable Architecture

Rules are stored in JSON configuration files:

config/rules.json

Example configuration:

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

This allows rule updates without modifying application logic.

Project Structure
Decision-System
│
├── config
│   └── rules.json
│
├── controllers
│   ├── businessLogic.js
│   └── getLogs.js
│
├── engines
│   ├── ruleEngine.js
│   └── workflowEngine.js
│
├── routes
│   └── workflowRoutes.js
│
├── services
│   ├── auditServices.js
│   └── stateManager.js
│
├── utils
│   └── externalServices.js
│
├── tests
│   └── testCases.md
│
├── app.js
├── README.md
└── architecture.md
API Endpoints
Process Workflow
POST /workflow/process

Example request:

{
 "score": 85
}

Example response:

{
 "requestId": "abc123",
 "decision": "approve",
 "ruleTriggered": "high_score"
}
Audit Logs

Retrieve decision explanation.

GET /workflow/audit/:requestId

Example response:

[
 {
  "requestId": "abc123",
  "rule": "high_score",
  "decision": "approve",
  "timestamp": "2026-03-20T10:20:00Z"
 }
]
Idempotency Handling

Duplicate requests are detected using a hash of the request payload.

If the same request is sent again, the system returns the previous response instead of processing it again.

Test Cases

Test scenarios are documented in:

tests/testCases.md

Covered cases include:

Happy path

Invalid input

Duplicate requests

Missing fields

Rule evaluation

Audit log verification

Running the Project
Install dependencies
npm install
Start server
node app.js

Server runs on:

http://localhost:3000
Example Testing Using Thunder Client

Example request:

POST http://localhost:3000/workflow/process

Body:

{
 "score": 85
}

Expected output:

approve
Scaling Considerations

For production deployment, the following improvements can be implemented:

Redis for distributed idempotency storage

Message queues for workflow orchestration

Horizontal API scaling using load balancers

Persistent database for audit logs and state history

Design Trade-offs
Choice	Reason
JSON configuration	Allows dynamic rule updates
In-memory storage	Simpler prototype implementation
Modular architecture	Enables scalability and maintainability
Technologies Used

Node.js

Express.js

REST APIs

JSON-based rule configuration