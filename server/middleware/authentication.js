const jwt = require('jwt');
const config = require('config');

const JWT_SECRET = config.get("JWT_SECRET");

const auth = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if(!authHeader) {
        return res.status(403).json({
            message: 'authentication token is missing'
        })
    }
    const decoded = jwt.verify(authHeader, JWT_SECRET);
    if(decoded && decoded.id) {
        req.userId = decoded.id;
        next();
    } else {
        return res.status(403).json({msg: "Incorrect token"});
    }
}

module.exports = {
    auth
}