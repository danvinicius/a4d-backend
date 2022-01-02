const bcrypt = require("bcryptjs");
const User = require("../models/User");
const transporter = require("../mailer/mailer");
const jwt = require("jsonwebtoken");
const jwtsecret = process.env.JWTSECRET;

module.exports = {
  findUser: async (req, res) => {
    const { email } = req.params;
    if (email == undefined) {
      res.status(400).json({ message: "Requisição inválida" });
      return;
    } else {
      try {
        const user = await User.findOne({ email: email });
        if (user) {
          res.status(200).json({ message: "OK" });
          return;
        } else {
          res.status(404).json({ message: "Este usuário não existe" });
          return;
        }
      } catch (e) {
        res.status(500).json({ message: "Algo de errado aconteceu" });
        return;
      }
    }
  },
  createUser: async (req, res) => {
    const { name, email, password } = req.body;
    if (name == undefined || email == undefined || password == undefined) {
      res.status(400).json({ message: "Requisição inválida" });
      return;
    } else {
      try {
        const user = await User.findOne({ email: email });
        if (user) {
          res.status(406).json({ message: "Este usuário já existe" });
          return;
        } else {
          const salt = await bcrypt.genSalt(10);
          const hash = await bcrypt.hash(password, salt);
          const user = new User({ name, email, password: hash });

          await user.save();
          jwt.sign(
            {
              id: user._id,
              email: user.email,
              name: user.name,
            },
            jwtsecret,
            { expiresIn: "48h" },
            (err, token) => {
              if (err) {
                res.status(401).json({
                  message: "Falha na autenticação",
                });
                return;
              } else {
                res.status(200).json({
                  message: "OK",
                  token: token,
                });
              }
            }
          );
        }
      } catch (e) {
        res.status(500).json({ message: "Algo de errado aconteceu" });
        return;
      }
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    if (email == undefined || password == undefined) {
      res.status(400).json({
        message: "Requisição inválida",
      });
      return;
    } else {
      try {
        const user = await User.findOne({ email: email });
        if (user) {
          const result = await bcrypt.compare(password, user.password);
          if (result) {
            jwt.sign(
              {
                id: user._id,
                email: user.email,
                name: user.name,
              },
              jwtsecret,
              { expiresIn: "48h" },
              (err, token) => {
                if (err) {
                  res.status(401).json({
                    message: "Falha na autenticação",
                  });
                  return;
                } else {
                  res.status(200).json({
                    message: "OK",
                    token: token,
                  });
                }
              }
            );
          } else {
            res.status(401).json({
              message: "Senha incorreta",
            });
            return;
          }
        } else {
          res.status(404).json({
            message: "Este usuário não existe",
          });
          return;
        }
      } catch (e) {
        res.status(500).json({ message: "Algo de errado aconteceu" });
        return;
      }
    }
  },

  validate: async (req, res) => {
    res.json({ name: req.user.name, email: req.user.email, id: req.user.id });
  },

  deleteUser: async (req, res) => {
    const { id } = req.params;
    if (id == undefined) {
      res.status(400).json({ message: "Requisição inválida" });
      return;
    } else {
      try {
        const user = await User.findOne({ _id: id });
        if (user) {
          await User.deleteOne({ _id: id });
          res.status(200).json({ message: "OK" });
          return;
        } else {
          res.status(404).json({ message: "Este usuário não existe" });
          return;
        }
      } catch (e) {
        res.status(500).json({ message: "Algo de errado aconteceu" });
        return;
      }
    }
  },

  recoverPassword: async (req, res) => {
    function geraStringLetrasAleatoria() {
      let string = "";
      caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      for (let i = 0; i < 4; i++) {
        string += caracteres.charAt(
          Math.floor(Math.random() * caracteres.length)
        );
      }
      return string;
    }
    function geraStringNumerosAleatoria() {
      let string = "";
      numeros = "0123456789";
      for (let i = 0; i < 2; i++) {
        string += numeros.charAt(Math.floor(Math.random() * numeros.length));
      }
      return string;
    }
    const stringAleatoria =
      geraStringLetrasAleatoria() + geraStringNumerosAleatoria();

    const { email } = req.body;
    if (email == undefined) {
      res.status(400).json({ message: "Requisição inválida" });
      return;
    } else {
      try {
        const user = await User.findOne({ email: email });
        if (user) {
          user.recoverCode = stringAleatoria;
          await user.save();
          try {
            await transporter.sendMail({
              from: `${process.env.NOME} <${process.env.EMAIL}>`,
              to: user.email,
              subject: "Recuperação de senha",
              html: `<h1>Olá ${
                user.name.split(" ")[0]
              }, recupere sua senha aqui</h1> 
              <br/> 
              <h2>Seu código de recuperação de senha é: </h2>
              <h3>${user.recoverCode}</h3>`,
            });
            res.status(200).json({
              message: "OK",
            });
          } catch (e) {
            res.status(500).json({ message: "Algo de errado aconteceu" });
            return;
          }
        } else {
          res.status(404).json({ message: "Este usuário não existe" });
          return;
        }
      } catch (e) {
        res.status(500).json({ message: "Algo de errado aconteceu" });
        return;
      }
    }
  },
  validateRecoverCode: async (req, res) => {
    const { email, code } = req.body;
    if (code == undefined || email == undefined) {
      res.status(400).json({ message: "Requisição inválida" });
      return;
    } else {
      try {
        const user = await User.findOne({ email: email });
        if (user) {
          if (user.recoverCode === code) {
            res.status(200).json({
              message: "OK",
              email: user.email,
            });
          } else {
            res.status(401).json({
              message: "Código de recuperação inválido.",
            });
          }
        } else {
          res.status(404).json({ message: "Este usuário não existe" });
          return;
        }
      } catch (e) {
        res.status(500).json({ message: "Algo de errado aconteceu" });
        return;
      }
    }
  },

  changePassword: async (req, res) => {
    const { email, newPassword } = req.body;
    if (email == undefined || newPassword == undefined) {
      res.status(400).json({ message: "Requisição inválida" });
      return;
    } else {
      try {
        const user = await User.findOne({ email: email });
        if (user) {
          const salt = await bcrypt.genSalt(10);
          const hash = await bcrypt.hash(newPassword, salt);
          user.password = hash;
          await user.save();
          jwt.sign(
            {
              id: user._id,
              email: user.email,
              name: user.name,
            },
            jwtsecret,
            { expiresIn: "48h" },
            (err, token) => {
              if (err) {
                res.status(401).json({
                  message: "Falha na autenticação",
                });
                return;
              } else {
                res.status(200).json({
                  message: "OK",
                  token: token,
                });
              }
            }
          );
        } else {
          res.status(404).json({ message: "Este usuário não existe" });
          return;
        }
      } catch (e) {
        res.status(500).json({ message: "Algo de errado aconteceu" });
        return;
      }
    }
  },
};
