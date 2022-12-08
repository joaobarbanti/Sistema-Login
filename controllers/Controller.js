const User = require("../model/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const RegisterUser = async (req, res, next) => {
  console.log(req.body);

  const safepass = await bcrypt.hash(req.body.password, 10);
  try {
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: safepass,
    });

    res.json({ status: "ok", message: "Usuario Registrado com sucesso" });
  } catch (err) {
    res.json({ status: "error", error: "email ja existente" });
  }
};
const LoginUser = async (req, res, next) => {
  const finduser = await User.findOne({
    email: req.body.email,
  });

  if (!finduser) {
    res.json({ status: "error", message: "Usuario não encontrado" });
  }

  const comparepassword = bcrypt.compare(req.body.password, finduser.password);

  if (comparepassword) {
    const token = jwt.sign(
      {
        name: finduser.name,
        email: finduser.email,
      },

      "secret123"
    );

    return res.json({ status: "ok", finduser: token });
  } else {
    return res.json({ status: "error", error: "email ja existente" });
  }
};
exports.RegisterUser = RegisterUser;
exports.LoginUser = LoginUser;
