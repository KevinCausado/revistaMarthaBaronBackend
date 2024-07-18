const signup = (req, res, next) => {
  res.status(200).json({
    status: "Success",
    message: "Inicio de sesión exitoso",
  });
};

module.exports = { signup };
