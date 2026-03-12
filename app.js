const express = require("express");

const workflowRoutes = require("./routes/workflowRoutes");

const app = express();

app.use(express.json());

app.use("/workflow", workflowRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});