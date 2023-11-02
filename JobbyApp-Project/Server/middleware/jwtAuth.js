const jwt = require("jsonwebtoken");

const jwtAuth = (req, res, next) => {
    let jwtToken;
    const authHeader = req.headers["authorization"];
    if (authHeader !== undefined) {
        jwtToken = authHeader.split(" ")[1]
    }

    if (jwtToken === undefined) {
        return res.status(401).json({ message: "Token Invalid" })
    }
    else {
        jwt.verify(jwtToken, 'Pavan', async(error, payload) => {
            if (error) {
                console.log(error);
                return res.status(401).json({ message: "Invalid Token" })
            }
            else {
                req.id = payload.id;
                next();
            }
        });
    }
}

module.exports = jwtAuth;