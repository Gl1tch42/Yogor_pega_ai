const express = require('express');
const router = express.Router();

const alunosRoutes = require('./alunos.routes');

router.get('/test',async (req,res) => res.json({teste:'dd'}))
router.use('/aluno',alunosRoutes);


module.exports = router;