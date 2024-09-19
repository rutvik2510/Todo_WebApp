const jwt = require("jsonwebtoken");
const token = require("../models/user");
require('dotenv').config();

const authorise = async(req, res, next) => {
    const token = req.header('Authorization'); //.replace('Bearer ', '');
    const BearerWord = (token.split(" ")[0]).trim();
    const BearerToken = token.split(" ")[1];
    //const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (BearerWord != "Bearer") {
        return res.status(403).json({ message: "Invalid Header" });
    }
    if (!BearerToken) {
        return res.status(401).json({ message: "No Token , Authorization denied" });
    }
    try {
        const decoded = jwt.verify(BearerToken, "rutvik");
        req.user = decoded.userId;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Token is not valid' });
    }
};



module.exports = authorise;