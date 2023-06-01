const express = require('express');
const router = express.Router();
const Person = require('../models/Person');

// Rota para listar todos os usuários
router.get('/', async (req, res) => {
  try {
    const users = await Person.find(); // Obtém todos os usuários do banco de dados

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;