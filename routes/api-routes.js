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

  // GET ALL USERS
  app.get("/api/users/", function(req, res) {
    db.User.findAll({})
    .then(function(data) {
      res.json(data);
    });
  });

  // GET ALL COURSES
  app.get("/api/courses/", function(req, res) {
    db.Course.findAll({})
    .then(function(data) {
      res.json(data);
    });
  });

  // GET ALL REVIEWS
  app.get("/api/reviews/", function(req, res) {
    db.Review.findAll({})
    .then(function(data) {
      res.json(data);
    });
  });

  // GET ALL PROGRESSES
  app.get("/api/progresses/", function(req, res) {
    db.Progress.findAll({})
    .then(function(data) {
      res.json(data);
    });
  });

  // GET ALL REVIEWS OF SELECTED COURSE
  app.get("/api/reviews/:courseId", function(req, res) {
    db.Course.findOne({
      where: {
        id: req.params.courseId
      },
      include: [db.Review]
    }).then(function(data) {
      res.json(data);
    });
  });

  // GET PROGRESSES OF SELECTED USER
  app.get("/api/progresses/:userId", function(req, res) {
    db.User.findOne({
      where: {
        id: req.params.userId
      },
      include: [db.Progress]
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  // HACK (DO NOT USE FOR FRONTEND)
  app.get("/api/register/:username/:password/:first_name", function(req, res) {
    console.log(req.params);
    db.User.create({
      username: req.params.username,
      password: req.params.password,
      first_name: req.params.first_name
    })
    .then(function(data) {
      //res.json(data);
      res.redirect("/api/users/");
    });
  });

  // CREATE USER API - MICHELLE
  app.post("/api/register/", function(req, res) {
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


  // app.get("/api/authors/:id", function(req, res) {
  //   // Here we add an "include" property to our options in our findOne query
  //   // We set the value to an array of the models we want to include in a left outer join
  //   // In this case, just db.Post
  //   db.Author.findOne({
  //     where: {
  //       id: req.params.id
  //     },
  //     include: [db.Post]
  //   }).then(function(dbAuthor) {
  //     res.json(dbAuthor);
  //   });
  // });
  // Find all projects with a least one task where task.state === project.state
  // Project.findAll({
  //     include: [{
  //         model: Task,
  //         where: { state: Sequelize.col('project.state') }
  //     }]
  // })



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
