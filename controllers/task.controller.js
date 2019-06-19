const Task = require('../models/task.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.create = function (req, res) {
    let task = new Task(
        {
            name: req.body.name,
            description: req.body.description
        }
    );

    task.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Task Created successfully')
    })
};