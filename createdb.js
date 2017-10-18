/**
 * Created by kulendra on 17/10/17.
 */
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/notificationdb";

MongoClient.connect(url, function(err, db) {
    db.createCollection("notifications", function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
        //db.close();
    });
    for(var i=0;i<10;i++){
        var myobj={name:"Ankur"+(i+1),noOfTimes:i,flag:0};
        db.collection("notifications").insertOne(myobj,function (err,res) {
            if (err) throw err;
            console.log(i+" document inserted");
           // db.close();
        })
    }
    db.close();
});