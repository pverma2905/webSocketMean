require('dotenv').config()
const cors = require('cors');
const express = require("express");
const apiRouter = require("./routes/routes");
const app = express();
const port = 4000;

app.use(cors())
app.use(express.json())
app.use("/api", apiRouter)

app.listen(port,  ()=> {
  console.log(`server listening on port ${port}!`);
});
