const router = require('express').Router()
const express = require('express')

const Person = require('../models/Person')

//Create user
router.post('/', async (req,res)=>{
    // req.body
    const {nome, sobrenome, dataNasc, endereco, codigo, telefone, cidade, estado, status} = req.body
    
    if(!nome, !sobrenome, !dataNasc, !codigo, !endereco, !telefone, !cidade, !estado, !status){
        res.status(422).json({error: 'Não foi possível validar as informações de cadastro'})
    }

    const person = {
        nome, 
        sobrenome,
        dataNasc,
        endereco,
        codigo,
        telefone,
        cidade,
        estado, 
        status
    }

    try {
        //criando dados pessoas
        await Person.create(person)

        res.status(201).json({message: 'Pessoa inserida no sistema com sucesso'})

    } catch (error) {
        res.status(500).json({error: error})
    }

/*
    O modelod de JSON que deve ser passado para cadastrar o usuario está abaixo:
    {
    "nome": "Arthur Felipe", 
    "sobrenome":"Rech",
    "dataNasc":"23/12/2003",
    "endereco":"Rua xxx N tal",
    "codigo":"Podes colocar qualquer string, será gerado automaticamente com o prefixo COD1+",
    "telefone":"+55 41 987324554",
    "cidade":"São José dos Pinhais",
    "estado":"Paraná", 
    "status":"true"
    }

*/
    
})



  module.exports = router
