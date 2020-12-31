const jwt = require('jsonwebtoken');
const fs = require('fs');
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
    try {
        console.log(req.body);
        const decoded = jwt.verify(req.body.token, JWT_SECRET);
        req.userDecoded = decoded;
        req.username = decoded.username;
        next();
    }
    catch(error){
        let dirname = './uploads';
        console.log('Auth failed');

        fs.promises.readdir(dirname)
            .then((files) => {
                if (files.length > 0){
                    fs.rmdirSync(dirname, { recursive: true });
                    fs.mkdirSync(dirname);
                }
            })
            .catch((err) => {
                console.log(err);
            });


        res.json({
            error: true,
            message: 'Auth failed!',
            response: error
        });
    }
}