const jwt = require('jsonwebtoken');

const config = process.env;

const verifyToken = (req, res, next) => {
    // const token = req.body.token || req.query.token || req.headers['x-access-token'];

    // if (!token) {
    //     return res.status(403).send('You need a token for access this page');
    // }
    let authorization = req.headers.authorization

    if (!authorization) {
        return res.status(401).send('You are not logged in')
    }

    let [part1, part2] = authorization.split(' ')
    if (part1 !== 'Bearer' || !part2) {
        return res.status(401).send('You are not logged in')
    }

    console.log("token----", part2)



    try {
        //check token
        const decoded = jwt.verify(part2, config.TOKEN_KEY);
        //get userId & citizenId
        req.user = decoded;
    } catch (err) {
        return res.status(401).send('Invalid Token');
    }
    return next();
}

module.exports = verifyToken;