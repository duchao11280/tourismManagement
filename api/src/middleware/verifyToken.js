const jwt = require("jsonwebtoken");


exports.verifyToken = (req, res, next) => {
    let token = req.headers[process.env.key_token] || req.cookies[process.env.key_token];
    if (!token) {
        res.status(403).json({ status: false, message: "Không có token" });
        return;
    } else {
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                res.status(403).json({ status: false, message: "Không được cấp quyền" });
                return;
            } else {
                req.role = decoded.role;
                req.userID = decoded.userID;
                next();
            }
        });
    }
}

