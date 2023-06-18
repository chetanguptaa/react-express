const jwt = require('jsonwebtoken');
const config = require('config');

const ACCESS_TOKEN_SECRET = config.get('accessPrivateKey');

const auth = (req, res, next) => {
    try {
        let token = req.header("Authorization");
    
        if (!token) {
          return res.status(403).send("Access Denied");
        }
    
        if (token.startsWith("Bearer ")) {
          token = token.slice(7, token.length).trimLeft();
        }
    
        const verified = jwt.verify(token, ACCESS_TOKEN_SECRET);
        req.user = verified;
        next();
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
}

module.exports = {
    auth
}

