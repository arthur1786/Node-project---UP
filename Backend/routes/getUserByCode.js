const express = require('express');
const router = express.Router();
const Person = require('../models/Person');

// Rota para obter um único usuário pelo código
router.get('/:codigo', async (req, res) => {
    try {
      const codigo = req.params.codigo;
  
      // Aqui você pode buscar o usuário no banco de dados pelo código
      const user = await Person.findOne({ codigo }).sort({ codigo: -1 });
  
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
  
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  });
  

module.exports = router;