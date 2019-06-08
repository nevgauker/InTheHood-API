var jwt = require('jsonwebtoken');
const jwt_key = "secret";

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded =jwt.verify(token, jwt_key);
        req.userData = decoded;
        next();
    } catch(error) {
        return res.status(401).json ({
            error : 'Auth failed',
            bla : req.headers
        });
    }
};
        
