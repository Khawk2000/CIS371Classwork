
var express = require('express');
var router = express.Router();

const database = require('./database.js');
let db = database.getDB();

router.get('/posts', function(req, res){
	console.log('Got a request on all posts.');
	let sql = 'SELECT * FROM post';
	db.all(sql, [], function(err, rows) {
		if(err){
			console.log(err.message);
		}else{
			console.log(rows);
			res.json(rows);
		}
	});
});


router.post('/posts', function(req, res){
	let sql = 'INSERT INTO post (text, timestamp, userId) VALUES((?),(?),(?) )';
	db.run(sql, [ req.body.text, Date.now(), req.body.userId ], function(err){
		if(err){
			console.log(err.message);
		} else{
			console.log('Added new post for user: ' + req.body.userId + ' with postId: ' + this.lastID);
			res.sendStatus(200);
		}
	});
});

router.get('/posts/:postid', function(req, res){
	let sql = 'SELECT * FROM post WHERE postId = (?)';
	db.all(sql, [ req.params.postid ], function(err, rows){
		if(err){
			console.log(err.message);
		} else{
			console.log('Post number : ' + req.params.postid);
			res.json(rows);
		}
	});
});

router.put('/posts/:postid', function(req, res){
	let sql = 'UPDATE post SET text = (?), timestamp = (?) WHERE postId = (?)';
	db.run(sql, [ req.body.text, Date.now(), req.params.postid ], function(err,rows){
		if(err){
			console.log(err.message);
		} else{
			console.log('Update post');
			res.json(rows);
		}
	});
});


router.delete('/posts/:postid', function(req,res){
	let sql = 'DELETE from post WHERE postId = (?)';
	db.run(sql, [req.params.postid], function(err){
		if(err){
			console.log(err.message);
		} else{
			res.sendStatus(200);
		}
	});
});

router.get('/users/:userId/posts', function(req, res){
	let sql = 'SELECT * FROM post WHERE userId=(?)';
	db.all(sql, [ req.params.userId ], function(err, rows){
		if(err){
			console.log(err.message);
		}else{
			if(!rows){
				res.sendsstatus(404);
			} else{
				console.log("All posts from user " + req.params.userId);
				console.log(rows);
				res.sendStatus(200);
			}
		}
	});
});


module.exports = router;



