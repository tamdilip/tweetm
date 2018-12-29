var express = require('express');
var app = express();

var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var uristring = process.env.MONGOLAB_URI;
var myCollection;
var data;
var db= MongoClient.connect(uristring, function(err, db) {
        if(err)
            throw err;
        console.log("connected to the mongoDB !");
        myCollection = db.collection('users');
        myCollection1= db.collection('feeds');
        myCollection2= db.collection('chat');

 myCollection.find().forEach( function(doc) 
{ 
console.log( "user: " + doc.name ); 
myCollection.update({ name: doc.name }, { $set:{ otp: Math.floor(100000 + Math.random() * 900000).toString().substring(0, 4) }}, function(err,doc){
console.log(doc);
});
});

});
   
setInterval(function () { 
 myCollection.find().forEach( function(doc) 
{ 
myCollection.update({ name: doc.name }, { $set:{ otp: Math.floor(100000 + Math.random() * 900000).toString().substring(0, 4) }}, function(err,doc){
console.log(doc);
});
});
}, 300000); 

var accountSid = ''; 
var authToken = ''; 
 
var client = require('twilio')(accountSid, authToken); 


app.set('port', (process.env.PORT || 5000));

var bodyParser = require('body-parser');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());



app.get('/data1', function (req, res) {

	  myCollection.find({}).toArray(function (err, docs) {
	 res.json(docs);
	  });
	});


app.post('/data1', function (req, res) {
	  myCollection.insert(req.body, function(err, doc) {
	   
if(doc.insertedCount){
	console.log('New User Registered');
res.json(doc);
console.log(doc);
}
else
{
res.json(doc.insertedCount=0);
console.log('Username Already Exists- Registration Failed !!');
}

	  });
	});



app.post('/fg/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
myCollection.find({ phno:id }).toArray(function (err, doc) {
var json=doc;
json.forEach(function(data)
{
var no=data.phno;
var otp=data.otp;
console.log(no);
console.log(otp);
console.log(data.otp);
if(data.otp){
client.messages.create({ 
	to: no, 
	from: "+12484500171", 
	body: "Your otp to change password : " +otp,   
}, function(err, message) { 
	console.log(err);
	console.log(message);
	console.log("Message not Sent"); 
});
}
});
res.json(doc);
});
});

app.post('/ffg/:id', function (req, res) {
var id = req.params.id;
  console.log(id);
myCollection.find({ otp:id }).toArray(function (err, doc) {
res.json(doc);
});
});


app.post('/check/:id', function (req, res) {
  var id = req.params.id;
  console.log('Logging User Check',id);
myCollection.find({ name:id }).toArray(function (err, doc) {
res.json(doc);

if(doc.length){

console.log('Valid User');
console.log(doc);
}
else
{
console.log('Invalid User - No Records Found');
}

});
});

app.put('/pup/:id', function (req, res) {
var id = req.params.id;
console.log( req.body.name);
console.log(id);
myCollection.update({ name: req.body.name }, { $set:{ pass: 
id  }}, function(err,doc){
res.json(doc);
console.log(doc);
});
});



	 

app.put('/deacc/:id', function (req, res) {
 var id = req.params.id;
myCollection.remove({ $and: [{ name:req.body.name},{phno:id } ] } ,function(err,doc){
console.log(doc);
});


myCollection.update(
    { },
    { $pull: { following: req.body.name }  },
    { multi: true },function(err,doc){
console.log(doc);
});

myCollection1.remove({ user:req.body.name} ,function(err,doc){
console.log(doc);
res.json(doc);
});

});


app.post('/data1/:id', function (req, res) {
  var id = req.params.id;
var pass1=req.body.pass;
console.log(pass1);
  console.log('Logging User Check',id);
myCollection.find( { $and: [{ name:id},{pass:req.body.pass } ] }).toArray(function (err, doc) {
res.json(doc);

if(doc.length){
myCollection.update({ name:id }, { $set:{ status:1  }}, function(err,doc){

console.log(doc);
});
console.log('Valid User');
console.log(doc);
}
else
{
console.log('Invalid User - No Records Found');
}

});
});


app.post('/out', function (req, res) {
  
myCollection.update({ name:req.body.name }, { $set:{ status:0  }}, function(err,doc){
res.json(doc);
console.log(doc);
});

});

app.post('/sms/:id', function (req, res) {
 var id = req.params.id;
 var no = req.body.phno;
console.log(no);
console.log(id);
client.messages.create({ 
	to: no, 
	from: "+19723189531", 
	body: "Hai "+id+" !! Your account has been logged in.",   
}, function(err, message) { 
 	console.log("Message not Sent");
});
});



app.put('/dp', function (req, res) {
console.log(req.body.dp);
cccccccc

	});
app.put('/data1', function (req, res) {
console.log(req.body.name);
console.log(req.body.following);
myCollection.update({ name: req.body.name }, { $addToSet: { 

following: req.body.following } }, {},function(err,doc){
res.json(doc);
});

	});

app.put('/data1/:id', function (req, res) {

console.log(req.body.following);
myCollection.update({ name: req.body.name }, { $pull: { following: 
req.body.following } }, {},function(err,doc){
res.json(doc);
});

	});






app.get('/data2', function (req, res) {

	  myCollection1.find({}).toArray(function (err, docs) {
	 res.json(docs);
	  });
	});


app.get('/data2/:id', function (req, res) {
	var id = req.params.id;
  console.log(id);
myCollection1.findOne({"_id": ObjectID(id)},function (err, doc) {
res.json(doc);
console.log(doc);
});
	});


app.post('/data2', function (req, res) {
	  console.log(req.body.feeds);
	  myCollection1.insert(req.body, function(err, doc) {
	    res.json(doc);
	  });
	});


app.get('/data3', function (req, res) {
	  myCollection2.find({}).toArray(function (err, docs) {
	 res.json(docs);
	  });
	});

app.post('/data3', function (req, res) {
	  console.log(req.body.msg);
	  myCollection2.insert(req.body, function(err, doc) {
	    res.json(doc);
	  });
	});


app.put('/read/:id', function (req, res) {
	var id = req.params.id;
  console.log(id);
console.log(req.body.user1);
myCollection2.update({ $and: [{ user1:id},{user2:req.body.user1 } ] }, { $set: { status:'read' } }, {multi:true},function(err,doc){
console.log(doc);
res.json(doc);
});

	});


app.post('/data2/:id', function (req, res) {
	var id = req.params.id;
  console.log(id);

myCollection1.update({"_id": ObjectID(id)}, { $set: { 

feeds:req.body.feeds} }, { multi: true }, function (err, doc) {
res.json(doc);
console.log(doc);

});
	});



app.put('/data2/:id', function (req, res) {
	var id = req.params.id;      
    console.log(id);
	  myCollection1.remove({"_id": ObjectID(id)}, 1,function

(err, doc) {
	    res.json(doc);
console.log(doc);
	  });
	});






app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
