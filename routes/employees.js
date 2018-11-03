/*
 * Defines all the routes and their corresponding controller's function
 * in the database.  
 */ 


var express = require('express'); 
var router = express.Router(); 

var employee = require("../controllers/EmployeeController.js");

/* 'get' request on '/' to list all employees entries */
router.get('/', function(req, res) {
    employee.list(req, res); 
}); 
/* 'get' request on '/show/:id' to get a single employee entry */
router.get('/show/:id', function(req, res) {
    employee.show(req, res); 
});
/* 'get' request on '/create' to redirects on the 'create employee' view page */ 
router.get('/create', function(req, res) {
    employee.create(req, res); 
});
/* 'post' request on '/save' to save a new employee entry */
router.post('/save', function(req, res) {
    employee.save(req, res); 
}); 
/* 'get' request on '/edit/:id' to redirects on the 'update employee' view page */
router.get('/edit/:id', function(req, res) {
    employee.edit(req, res);
});
/* 'post' request on '/update/:id' to update an employee entry */
router.post('/update/:id', function(req, res) {
    employee.update(req, res);
}); 
/* 'delete' request on '/delete/:id' to delete an employee entry */
router.post('/delete/:id', function(req, res) {
    employee.delete(req, res); 
}); 

module.exports = router; 