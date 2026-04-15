const express = require("express");
const router = express.Router();

const { redefinirSenha } = require("../controllers/redefinirSenhaControllers");

// POST /redefinir-senha
router.post("/redefinir-senha", redefinirSenha);

module.exports = router;