var express = require('express');
var app=express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path')
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/notificationdb";
var data=[];

setInterval(function () {
    MongoClient.connect(url,function (err,db) {
        if(err) throw err;
        for(i=0;i<10;i++){
            var object={name:"Mrinal"+i,noOfTimes:i,flag:0};
            db.collection("notifications").insertOne(object,function (err,res) {
                if(err) throw err;
            });
            console.log("inserted");
        }

        db.close();
    })
},60000);


setInterval(function () {
    data.length=0;
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
        var query = { flag:0 };
        db.collection("notifications").find(query).toArray(function(err, result) {
            if (err) throw err;
            data=data.concat(result);
            io.on('connection', function(socket) {
                socket.emit('testerEvent', {description: data});
            });
            //data.length=0;
            console.log("query result: "+result.length)
            db.close();
        });
});
}, 50000);


app.get('/', function(req, res) {
    app.use(express.static(path.join(__dirname, '/public')));
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
    socket.on('clientEvent', function (data) {
        if (data == 'updateflag') {
            MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                db.collection("notifications").update({'flag': 0},
                    {$set: {'flag': 1}}, {multi: true});
                var query = {flag: 0};
                db.collection("notifications").find(query).toArray(function (err, result) {
                    if (err) throw err;
                    console.log(result);
                });
            });
        }
        //this.data.length=0;
    });
});



http.listen(3000, function() {
    console.log('listening on localhost:3000');
});