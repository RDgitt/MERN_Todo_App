const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWTSECRETKEY


const fetchuser = (req, res, next) => {
    const token = req.header('auth-token')
    if(!token) res.status(401).send({error:"unauthorized user"})

    try {
        const data = jwt.verify(token, jwtSecret);
        req.user = data;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).send({error:"unauthorized user"})
    }
}

module.exports = fetchuser;