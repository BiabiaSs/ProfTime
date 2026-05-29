const pool = require('../banco/conexaoBanco');


// LISTAR CURSOS
const listarCursos = async (req, res) => {

    try {

        const [dados] = await pool.query(`
            
            SELECT
                curso.id_curso,
                curso.nome_curso,
                periodos.periodo

            FROM curso

            INNER JOIN periodos
            ON curso.id_periodo = periodos.id_periodo

            ORDER BY curso.id_curso DESC
        
        `);

        res.status(200).json(dados);

    } catch (erro) {

        res.status(500).json({
            erro: erro.message
        });

    }

};


// CADASTRAR CURSO
const cadastrarCurso = async (req, res) => {

    try {

        const {
            nome_curso,
            id_periodo
        } = req.body;


        if (!nome_curso || !id_periodo) {

            return res.status(400).json({
                erro: 'Preencha todos os campos'
            });

        }


        await pool.query(

            `
                INSERT INTO curso
                (nome_curso, id_periodo)

                VALUES (?, ?)
            `,

            [
                nome_curso,
                id_periodo
            ]

        );


        res.status(201).json({
            mensagem: 'Curso cadastrado com sucesso'
        });

    } catch (erro) {

        res.status(500).json({
            erro: erro.message
        });

    }

};


// EDITAR CURSO
const editarCurso = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            nome_curso,
            id_periodo
        } = req.body;


        await pool.query(

            `
                UPDATE curso

                SET
                    nome_curso = ?,
                    id_periodo = ?

                WHERE id_curso = ?
            `,

            [
                nome_curso,
                id_periodo,
                id
            ]

        );


        res.status(200).json({
            mensagem: 'Curso atualizado'
        });

    } catch (erro) {

        res.status(500).json({
            erro: erro.message
        });

    }

};


// EXCLUIR CURSO
const excluirCurso = async (req, res) => {

    try {

        const { id } = req.params;


        await pool.query(

            `
                DELETE FROM curso
                WHERE id_curso = ?
            `,

            [id]

        );


        res.status(200).json({
            mensagem: 'Curso excluído'
        });

    } catch (erro) {

        res.status(500).json({
            erro: erro.message
        });

    }

};


module.exports = {

    listarCursos,
    cadastrarCurso,
    editarCurso,
    excluirCurso

};