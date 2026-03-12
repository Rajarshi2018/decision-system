const express = require("express");
const router = express.Router();

const {buisnessLogic} = require("../controllers/buisnessLogic");
const {getLogs} = require("../controllers/getLogs");

router.post("/process", buisnessLogic);

router.get("/audit/:id", getLogs);

module.exports = router;