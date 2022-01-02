require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const userRouter = require("./routes/User");

require("./database/connection");

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
// parse application/json
app.use(express.json());

app.use("/user", userRouter);
let PORT = 8081;
app.listen(PORT, () => {
  console.log("Servidor rodando na porta ", PORT);
});
