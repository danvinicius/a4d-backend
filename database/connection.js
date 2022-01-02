const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGOKEY)
  .then(() => {
    console.log("Sucesso ao conectar com o mongo");
  })
  .catch((err) => {
    console.log("Erro ao conectar com o mongo: ", err);
  });
