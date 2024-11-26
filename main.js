const cors = require("cors");
const express = require("express");
const router = require("./src/routes/router");
const connectdb = require("./src/config/config");
const app = express();
const port = 9000;

app.use(cors());
app.use(express.json());

connectdb()
app.use("/api/v1/users", router);




app.listen(port, () => {console.log("Port:", port)})
