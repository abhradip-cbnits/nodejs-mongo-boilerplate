const Task = require('../models/task.model');
const multer = require('multer');
const upload = multer();
var fs = require('fs');
var path = require('path');

var MongoClient = require('mongodb').MongoClient;
const url = "mongodb://heroku_l0pcjjzd:uacgb9vc7u94lcj9tp8632bonn@ds239797.mlab.com:39797/";


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

exports.showAllTasks = function (req, res) {

    task.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Task Created successfully')
    })
};


exports.processFiles = function (req, res) {

    var uri = "mongodb://heroku_l0pcjjzd:uacgb9vc7u94lcj9tp8632bonn@ds239797.mlab.com:39797/heroku_l0pcjjzd";

    var file_path = path.join(__dirname, '..', 'finalfile.txt');
    fs.readFile(file_path, function(err, data) {
        var file_data_string = data.toString('utf8');
        var types_array = ['alternativestemp', 'authtemp', 'crontemp', 'dpkgtemp', 'kerntemp', 'ng_accesstemp', 'ng_errortemp', 'systemp', 'ufwtemp'];

        var file_data_array = file_data_string.replace(/\n/g, '').split("SEPARATOR");
        file_data_array.pop();
     
        let mainDateWiseLog = {};
        let dateWiseLog = {};
        for (let i=0; i < types_array.length; i++)
        {
            let type_name = types_array[i];
            var type = types_array[i].replace("temp"," log");

            var file_data = file_data_array[i];
            var final_file_data = file_data.substring(file_data.indexOf("<"));

            var type_data = final_file_data.replace(type_name+':','' ).replace('{','').replace('}','');
            dateWiseLog[type] = type_data;
        }
        
        var current_date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') 
        mainDateWiseLog[current_date] = dateWiseLog;

        MongoClient.connect(uri, function(err, db) {
            if (err) throw err;
            var dbo = db.db("heroku_l0pcjjzd");
            dbo.collection("systemLog").insertOne(mainDateWiseLog, function(err, res) {
                if (err) throw err;
                console.log("1 document inserted");
                db.close();
            });
        });


    });

};


exports.processLogs = function (req, res) {

    var uri = "mongodb://heroku_l0pcjjzd:uacgb9vc7u94lcj9tp8632bonn@ds239797.mlab.com:39797/heroku_l0pcjjzd";

    if (req.body)
    {
        var file_data_string = req.body;
        var types_array = ['alternativestemp', 'authtemp', 'crontemp', 'dpkgtemp', 'kerntemp', 'ng_accesstemp', 'ng_errortemp', 'systemp', 'ufwtemp'];

        var file_data_array = file_data_string.replace(/\n/g, '').split("SEPARATOR");
        file_data_array.pop();
     
        let mainDateWiseLog = {};
        let dateWiseLog = {};
        for (let i=0; i < types_array.length; i++)
        {
            let type_name = types_array[i];
            var type = types_array[i].replace("temp"," log");

            var file_data = file_data_array[i];
            var final_file_data = file_data.substring(file_data.indexOf("<"));

            var type_data = final_file_data.replace(type_name+':','' ).replace('{','').replace('}','');
            dateWiseLog[type] = type_data;
        }
        
        var current_date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') 
        mainDateWiseLog[current_date] = dateWiseLog;

        MongoClient.connect(uri, function(err, db) {
            if (err) throw err;
            var dbo = db.db("heroku_l0pcjjzd");
            dbo.collection("systemLog").insertOne(mainDateWiseLog, function(err, res) {
                if (!err) {
                    console.log("1 document inserted");
                    db.close();
                    res.send("file received and processed in appjs ");
                }
                else{
                    res.send("database error ");
                }
                
            });
        });
    }
    else{
        res.send("No data supplied");  
    }

};