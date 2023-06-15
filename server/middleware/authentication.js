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

const auth = (req, res, next) => {
    // const authHeader = req.headers["authorization"];
    // if(!authHeader) {
    //     return res.status(403).json({
    //         message: 'authentication token is missing'
    //     })
    // }
    const { accessToken, refreshToken } = req.body;

    if (!accessToken || !refreshToken) {
        return res.status(403).json({
            message: 'Authentication tokens are missing'
        });
    }
    try {
        // const token = authHeader.split(' ')[1];
        const token = accessToken;
        const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
        req.userId = decoded.id;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
        }
        return res.status(403).json({ message: 'Invalid token' });
    }
}

module.exports = {
    auth,
    generateAccessToken,
    generateRefreshToken
}

