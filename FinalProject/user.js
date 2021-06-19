
var express = require('express');
var router = express.Router();

const database = require('./database.js');
let db = database.getDB();

router.get('/users', function(req, res){
	console.log('Got a request on users.');
	let sql = 'SELECT * FROM user';
	db.all(sql, [], function(err, rows) {
		if(err){
			console.log(err.message);
		}else{
			console.log(rows);
			res.json(rows);
		}
	});
});

router.get('/users/:userid', function(req, res){
	console.log('Got a request for user id # ' + req.params.userid);
	let sql = 'SELECT * FROM user WHERE id = (?)';
	db.get(sql, [ req.params.userid ], function (err, rows){
		if(err){
			console.log(err.message);
		}else {
			if(!rows){
				res.sendStatus(404);
			} else {
				console.log(rows);
				res.json(rows);
			}
		}
	});

});

router.post('/users', function(req, res){
	let sql = 'INSERT INTO user (firstName, lastName, email, password, joinedDate) VALUES( (?), (?), (?), (?), (?) )';
	db.run(sql, [ req.body.firstName, req.body.lastName, req.body.email, req.body.password, Date.now() ], function(err){
		if(err){
			console.log(err.message);
		} else{
			console.log('Added user #' + this.lastID);
			res.json({
				"newId":this.lastID
			});
		}
	});
});


router.put('/users/:userid', function(req, res){
	console.log('Updated information for userid #: ' + req.params.userid);
	let sql = 'UPDATE user SET firstName = (?), lastName = (?), email = (?), password = (?), joinedDate = (?) WHERE id = (?)';
	db.run(sql, [ req.body.firstName, req.body.lastName, req.body.email, req.body.password, Date.now(), req.params.userid ], function (err, rows){
		if(err){
			console.log(err.message);
		}else {
			console.log('Updated user #: ' + req.params.userid);
			res.json(rows);
		}
	});
});


router.delete('/users/:userid', function(req, res){
	let sql = 'DELETE FROM user WHERE id = (?)';
	db.run(sql, [ req.params.userid ], function(err, rows){
		if(err){
			console.log(err.message);
		}else {
			res.sendStatus(200);
		}
	});
});





module.exports = router;



