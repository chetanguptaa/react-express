const jwt = require('jsonwebtoken');
const config = require('config');

const ACCESS_TOKEN_SECRET = config.get('accessPrivateKey');
const REFRESH_TOKEN_SECRET = config.get('refreshPrivateKey');

const generateAccessToken = (payload) => {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
};

const generateRefreshToken = (payload) => {
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};

module.exports = {
    generateAccessToken,
    generateRefreshToken
};

// const JWT_SECRET = config.get("JWT_SECRET");

// const auth = (req, res, next) => {
//     const authHeader = req.headers["authorization"];
//     if(!authHeader) {
//         return res.status(403).json({
//             message: 'authentication token is missing'
//         })
//     }
//     const decoded = jwt.verify(authHeader, JWT_SECRET);
//     if(decoded && decoded.id) {
//         req.userId = decoded.id;
//         next();
//     } else {
//         return res.status(403).json({msg: "Incorrect token"});
//     }
// }

// module.exports = {
//     auth
// }