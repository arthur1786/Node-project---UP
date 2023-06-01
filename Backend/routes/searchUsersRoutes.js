const express = require('express');
const router = express.Router();
const Person = require('../models/Person');

// Rota para pesquisar usuários com base nos critérios fornecidos
router.get('/', async (req, res) => {
    try {
      const { nome, sobrenome, cidade, estado, status } = req.query;
  
      const searchCriteria = {};
  
      if (nome) {
        searchCriteria.nome = nome;
      }
  
      if (sobrenome) {
        searchCriteria.sobrenome = sobrenome;
      }
  
      if (cidade) {
        searchCriteria.cidade = cidade;
      }
  
      if (estado) {
        searchCriteria.estado = estado;
      }
  
      if (status !== undefined) {
        searchCriteria.status = status;
      }
  
      const users = await Person.find(searchCriteria);
  
      if (users.length === 0) {
        return res.status(404).json({ error: 'Nenhum usuário encontrado' });
      }
  
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  });
  
  module.exports = router;