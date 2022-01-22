const express = require("express");
const router = require("./router/router");
const cors = require("cors");

const app = express();
const port = process.env.port || 7800;

app.use(express.json());
app.use(cors());

app.use("/api/v1", router);

const server = app.listen(port, () => {
  console.log(`App run on port ${port}`);
});
