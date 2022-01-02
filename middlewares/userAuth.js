const jwt = require("jsonwebtoken");
const jwtsecret = process.env.JWTSECRET;

module.exports = (req, res, next) => {
  const authToken = req.headers["authorization"];

  if (authToken != undefined) {
    const token = authToken.split(" ")[1];
    console.log(token);

    jwt.verify(token, jwtsecret, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Falha na autenticação" });
      } else {
        console.log(decoded);
        req.user = decoded;
        next();
      }
    });
  } else {
    return res.status(403).json({ message: "Falha na autenticação" });
  }
};
