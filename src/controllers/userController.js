const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const auth = require('../auth/auth');

module.exports = {
    async signin(req, res) {

        const { password, email } = req.body;

        if (password.length < 6 || email.length < 5) return res.status(200).send({ status: 2, message: "Algo esta errado, verfifique seus dados." });

        const user = await userModel.findAll({
            where: {
                email
            }
        });

        if (user == "" || user == null) return res.status(200).send({ message: "Nenum usuário cadastrado", user });
        const u = JSON.parse(JSON.stringify(user));
        await bcrypt.compare(password, u[0].password).then((userOk) => {
            if (!userOk) return res.status(200).send({ message: "Erro ao authentica usuário.", user });
            u[0].password = undefined;
            return res.status(200).send({
                status: 1,
                u,
                token: auth.createToken(u[0].id),
                message: "Bem vindo!"
            });
        });
    },

    async getUsers(req, res) {
        const users = await userModel.findAll();
        if (users == "" || users == null) return res.status(200).send({ message: "Nenum usuário cadastrado" });
        return res.status(200).send({ users });
    },

    async createUser(req, res) {
        const { nome, password, email } = req.body;
        if (password.length < 6) return res.status(200).send({ status: 2, message: "Algo esta errado, verfifique seus dados." });
        if (nome === "" || password === "" || email === "") return res.status(200).send({ status: 2, message: "Dados incompletos." });

        const userExist = await userModel.findAll({ where: { email: email } });
        if (userExist != "" && userExst != null) return res.status(200).send({ status: 2, message: "Este usuário já existe." });

        const passwordEncrypt = await bcrypt.hash(password, 10);
        const users = await userModel.create({ nome, password: passwordEncrypt, email });

        users.password = undefined;
        return res.status(200).send({ status: 1, users, token: auth.createToken(users.id) });
    },

    async updateUser(req, res) {
        const { id, email, nome } = req.body;
        await userModel.update({ nome }, {
            where: {
                id,
                email
            }
        })

        return res.send({ message: "Dados alterados com sucesso!" });
    },
    async deleteUser(req, res) {
        const { id } = req.body
        if (!id) return res.send({ message: "Informações insuficientes." })
        await userModel.destroy({
            where: {
                id
            }
        })

        return res.send({ message: "Dados removidos com sucesso!" });
    }
}