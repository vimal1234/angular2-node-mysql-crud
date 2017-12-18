///// required modules 

var express = require('express')
var app = express()

// SHOW LIST OF EMPLOYEE
app.get('/', function(req, res, next) {
	req.getConnection(function(error, conn) {
		conn.query('SELECT * FROM users ORDER BY id DESC',function(err, rows, fields) {
			//if(err) throw err
			if (err) {
				req.flash('error', err)
				
			} else {
				//console.log(rows)
				res.end(JSON.stringify(rows));
			}
		})
	})
})

// SHOW ADD EMPLOYEE FORM
app.get('/add', function(req, res, next){	
	//console.log(res)
})

// ADD NEW EMPLOYEE POST ACTION
app.post('/add', function(req, res, next){	
	req.assert('name', 'Name is required').notEmpty()           //Validate name
	req.assert('age', 'Age is required').notEmpty()             //Validate age
    req.assert('email', 'A valid email is required').isEmail()  //Validate email

    var errors = req.validationErrors()
    
    if( !errors ) {   //No errors were found.  Passed Validation!
		
		/********************************************
		 * Express-validator module
		 
		req.body.comment = 'a <span>comment</span>';
		req.body.username = '   a user    ';

		req.sanitize('comment').escape(); // returns 'a &lt;span&gt;comment&lt;/span&gt;'
		req.sanitize('username').trim(); // returns 'a user'
		********************************************/
		var user = {
			name: req.sanitize('name').escape().trim(),
			age: req.sanitize('age').escape().trim(),
			email: req.sanitize('email').escape().trim()
		}
		
		req.getConnection(function(error, conn) {
			conn.query('INSERT INTO users SET ?', user, function(err, result) {
				//if(err) throw err
				if (err) {
					req.flash('error', err)
					
					
				} else {				
					req.flash('success', 'Data added successfully!')
					
				}
			})
		})
	}
	else {   //Display errors to user
		var error_msg = ''
		errors.forEach(function(error) {
			error_msg += error.msg + '<br>'
		})				
		req.flash('error', error_msg)		
		
		
        console.log(error_msg)
    }
})

// SHOW EDIT EMPLOYEE FORM
app.get('/edit/(:id)', function(req, res, next){
	req.getConnection(function(error, conn) {
		conn.query('SELECT * FROM users WHERE id = ' + req.params.id, function(err, rows, fields) {
			if(err) throw err
			
			// if user not found
			if (rows.length <= 0) {
				req.flash('error', 'User not found with id = ' + req.params.id)
				//console.log(rows)
				res.end(JSON.stringify(rows));
			}
			else { // if user found
				// render to views/user/edit.ejs template file
				//console.log(rows)
				res.end(JSON.stringify(rows));
				
			}			
		})
	})
})

// EDIT EMPLOYEE POST ACTION
app.put('/edit/(:id)', function(req, res, next) {
	req.assert('name', 'Name is required').notEmpty()           //Validate name
	req.assert('age', 'Age is required').notEmpty()             //Validate age
    req.assert('email', 'A valid email is required').isEmail()  //Validate email

    var errors = req.validationErrors()
    var user = {
		name: req.sanitize('name').escape().trim(),
		age: req.sanitize('age').escape().trim(),
		email: req.sanitize('email').escape().trim()
	}
	console.log(user)
	console.log(errors)
    if( !errors ) {   //No errors were found.  Passed Validation!
		
		/********************************************
		 * Express-validator module
		 
		req.body.comment = 'a <span>comment</span>';
		req.body.username = '   a user    ';

		req.sanitize('comment').escape(); // returns 'a &lt;span&gt;comment&lt;/span&gt;'
		req.sanitize('username').trim(); // returns 'a user'
		********************************************/
		
		req.getConnection(function(error, conn) {
			conn.query('UPDATE users SET ? WHERE id = ' + req.params.id, user, function(err, result) {
				//if(err) throw err
				if (err) {
					req.flash('error', err)
					console.log(user)
					
				} else {
					req.flash('success', 'Data updated successfully!')
					
					console.log(user)
					
				}
			})
		})
	}
	else {   //Display errors to user
		var error_msg = ''
		errors.forEach(function(error) {
			error_msg += error.msg + '<br>'
		})
		req.flash('error', error_msg)
	
        
    }
})

// DELETE EMPLOYEE
app.delete('/delete/(:id)', function(req, res, next) {
	var user = { id: req.params.id }
	
	req.getConnection(function(error, conn) {
		conn.query('DELETE FROM users WHERE id = ' + req.params.id, user, function(err, result) {
			//if(err) throw err
			if (err) {
				req.flash('error', err)
				// redirect to users list page
			} else {
				req.flash('success', 'User deleted successfully! id = ' + req.params.id)
				// redirect to users list page
			}
		})
	})
})

module.exports = app
