//fazer a controller
const knex = require('./../context')
// mysql://MichelEnzo:1234@localhost:3306/trabalho_s'

const AlunoController = {
    async buscar(req, res) {
        let alunos = await knex('alunos').select('*');
        for (let index = 0; index < alunos.length; index++) {
            const e = alunos[index];
            const turma = await knex('turmas').where('id_turmas', e.id_turmas);
            alunos[index].turma = turma[0].nm_turma;
        }
        return res.json(alunos);
    },

    async buscarBy(req, res) {
        const {id} = req.body;
        const alunos = await knex('alunos').where('id_aluno', id);
        return res.json(alunos);
    },

    async buscarPorTurma(req, res) {
        const {id} = req.body;
        const alunos = await knex('alunos').where('id_aluno', id);
        return res.json(alunos);
    },

    async inserirAluno(req, res) {
        const {aluno} = req.body;
        let result = await knex('alunos').insert(aluno);

        if(!result) return res.status(400).json({msg:'user does not inserted'});

        return res.status(200).json({msg:'user inserted'});

    },
}

module.exports = AlunoController;