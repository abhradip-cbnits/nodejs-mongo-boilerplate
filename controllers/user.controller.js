const User = require('../models/user.model');
const multer = require('multer');
const upload = multer();
var crypto = require('crypto');



//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the User controller!');
};

// Inserting a user data into database during signup
exports.createUser = function (req, res) {
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512',salt)
                                        .update(req.body.password)
                                        .digest("base64");
    req.body.password = salt + "$" + hash;
    req.body.permissionLevel = 1;

    let user = new User(req.body);

    user.save(function (err, data) {
        if (err) {
            return next(err);
        }
        else{
            res.status(200).send({
                id: data._id,
                message: "User created successfully."
            });
        }
    })
};
