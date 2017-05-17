// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the posts
  app.get("/api/users/", function(req, res) {
    db.User.findAll({})
    .then(function(data) {
      res.json(data);
    });
  });

  // Get route for returning posts of a specific category
  app.get("/api/posts/category/:username", function(req, res) {
    db.User.findAll({
      where: {
        username: req.params.username
      }
    })
    .then(function(data) {
      res.json(data);
    });
  });

  // // Get rotue for retrieving a single post
  // app.get("/api/posts/:id", function(req, res) {
  //   db.User.findOne({
  //     where: {
  //       id: req.params.id
  //     }
  //   })
  //   .then(function(data) {
  //     res.json(data);
  //   });
  // });

  // POST route for saving a new post
  app.post("/api/posts", function(req, res) {
    console.log(req.body);
    db.User.create({
      username: req.body.username,
      password: req.body.password,
      first_name: req.body.first_name
    })
    .then(function(data) {
      res.json(data);
    });
  });

  // DELETE route for deleting posts
  app.delete("/api/posts/:id", function(req, res) {
    db.User.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(function(data) {
      res.json(data);
    });
  });

  // PUT route for updating posts
  app.put("/api/posts", function(req, res) {
    db.User.update(req.body,
      {
        where: {
          id: req.body.id
        }
      })
    .then(function(data) {
      res.json(data);
    });
  });
};
