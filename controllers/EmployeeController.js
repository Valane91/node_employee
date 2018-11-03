/* 
 * Controller for the Employee's entry
 */


var mongoose = require('mongoose'); 
var Employee = require("../models/Employee"); 

var employeeController = {}; 

/* List all the employees informations */
employeeController.list = function(req, res) {
    Employee.find({}).exec(function(err, employees) {
        if(err) {
            console.log("Error:", err);
        } else {
            res.render("../views/employees/index", {employees: employees});
        }
    });
}; 

/* Show a single employee informations */
employeeController.show = function(req, res) {
    Employee.findOne({_id: req.params.id}).exec(function(err, employee) {
        if(err) {
            console.log("Error:", err); 
        } else {
            res.render("../views/employees/show", {employee: employee});
        }
    });
};

/* Redirects to the "create employee" view page */
employeeController.create = function(req, res) {
    res.render("../views/employees/create");
}; 

/* Save a new employee entry in the database */
employeeController.save = function(req, res) {
    var employee = new Employee(req.body);

    employee.save(function(err) {
        if(err) {
            console.log("Chat");
            console.log(err); 
            res.render('../views/employees/create'); 
        } else {
            console.log("Successfully created an employee"); 
            res.redirect("/employees/show/" + employee._id);
        }
    });
};

/* Redirect to the "update employee" view page */
employeeController.edit = function(req, res) {
    Employee.findOne({_id: req.params.id}).exec(function(err, employee) {
      if(err) {
          console.log("Error:", err);
      } else {
          res.render("../views/employees/edit", {employee: employee});
      }
    });
};

/* Update an employee entry */
employeeController.update = function(req, res) {
    Employee.findByIdAndUpdate(
        req.params.id 
        , { $set: {
            name: req.body.name 
            , address: req.body.address
            , position: req.body.position
            , salary: req.body.salary
            }
        }
        , function(err, employee) {
            if(err) {
                console.log(err); 
                res.render("../views/employees/edit", {employee: req.body});
            }

            res.redirect("/employees/show/" + employee._id);
        }
    );
};

/* Delete an employee entry */
employeeController.delete = function(req, res) {
    Employee.remove({_id: req.params.id}, function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("Employee deleted!"); 
            res.redirect("/employees"); 
        }
    });
};

module.exports = employeeController; 