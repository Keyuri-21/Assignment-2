/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

// config/routes.js

module.exports.routes = {

    'POST /login/signup': 'LoginController/signup',
    'POST /login/login': 'LoginController/login',
    'POST /login/admin-login':'LoginController/adminLogin',
    
    'POST /parent/create': {action:'ParentController/create', cors:false},
    'GET /parent/find': 'ParentController/find',
    'GET /parent/findOne/:id': 'ParentController/findOne',
    'PATCH /parent/update/:id': {action:'ParentController/update', cors:false},
    'DELETE /parent/delete/:id': {action:'ParentController/delete', cors:false},
    'GET /parent/search/:firstName': {action:'ParentController/search', cors:false},


    'POST /student/create': {action:'StudentController/create', cors: false},
    'GET /student/find': 'StudentController/find',
    'GET /student/findOne/:id': 'StudentController/findOne',
    'PATCH /student/update/:id': {action:'StudentController/update', cors: false},
    'DELETE /student/delete/:id': {action:'StudentController/delete', cors: false},
    'GET /student/search/:email': {action:'StudentController/searchByEmail', cors: false},

  };
  