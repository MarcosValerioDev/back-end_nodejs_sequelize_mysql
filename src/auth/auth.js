const jwt = require('jsonwebtoken');


module.exports = {
    createToken: (userId) => {
        return jwt.sign({ userId }, process.env.SECRET_KEY_TOKEN, { expiresIn: process.env.TOKEN_SPIRES });
    },
    token: (req, res, next) => {
        const token_header = req.headers.auth;
        if (!token_header) return res.send({ error: 'Autenticação recusada!' });
        jwt.verify(token_header, 'senhaComplexa', (err, decoded) => {
            if (err) return res.send({ error: "Token inválido!" });

            return next();
        })

    }
}