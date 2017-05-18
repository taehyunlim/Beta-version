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

  // GET USER(S)
  app.get("/api/users/:userId?", function(req, res) {
    // WHEN userId PARAMETER IS PRESENT, SPECIFY WHERE CONDITION FIRST
    const where = {};
    if (req.params.userId) {
      where.id = req.params.userId;
    }
    // USER hasMany PROGRESS; PROGRESS belongsTo COURSE
    db.User.findAll({
      where,
      include: [
        {
          model: db.Progress,
          include: [
            {
              model: db.Course
            }
          ]
        }
      ]
    })
    .then(data => {
      const resObj = data.map(user => {
        return Object.assign(
          {},
          {
            userId: user.id,
            username: user.username,
            firstName: user.first_name,
            password: user.password,
            courses: user.Progresses.map(progress => {
              return Object.assign(
                {},
                { 
                  progressId: progress.id,
                  progress: progress.current_progress,
                  completed: progress.completed,
                  courseId: progress.Course.id,
                  courseTitle: progress.Course.course_title,
                  courseLength: progress.Course.progress_length
                })
            })
          })
      })
      res.json(resObj)
    });
  });

  // GET COURSE(S)
  app.get("/api/courses/:courseId?", function(req, res) {
    // WHEN courseId PARAMETER IS PRESENT, SPECIFY WHERE CONDITION FIRST
    const where = {};
    if (req.params.courseId) {
      where.id = req.params.courseId;
    }
    // COURSE hasMany REVEIW; REVIEW belongsTo USER
    // COURSE hasMany PROGRESS; PROGRESS belongsTo USER 
    db.Course.findAll({
      where,
      include: [
            {
              model: db.Review,
              include: [
                {
                  model: db.User
                }
              ]
            },
            {
              model: db.Progress,
              include: [
                {
                  model: db.User
                }
              ]
            }
          ]
    })
    .then(function(data) {
      const resObj = data.map(course => {
        return Object.assign(
          {},
          {
            courseId: course.id,
            courseTitle: course.course_title,
            courseLength: course.progress_length,
            reviews: course.Reviews.map(review => {
              return Object.assign(
                {},
                { 
                  reviewId: review.id,
                  reviewTitle: review.review_title,
                  reviewText: review.review_text,
                  userId: review.User.id,
                  username: review.User.username,
                  firstName: review.User.first_name
                })
            }),
            progresses: course.Progresses.map(progress => {
              return Object.assign(
                {},
                {
                  progressId: progress.id,
                  userId: progress.User.id,
                  username: progress.User.username,
                  firstName: progress.User.first_name,
                  progress: progress.current_progress,
                  completed: progress.completed
                })
            })
          })
      });
      res.json(resObj);
    });
  });

  // GET ALL REVIEWS
  app.get("/api/reviews/:courseId?", function(req, res) {
    // WHEN courseId PARAMETER IS PRESENT, SPECIFY WHERE CONDITION FIRST
    const where = {};
    if (req.params.courseId) {
      where.id = req.params.courseId;
    }
    // START WITH COURSE
    // COURSE hasMany REVIEW; REVIEW belongsTo USER
    db.Course.findAll({
      where,
      include: [
        {
          model: db.Review,
          include: [
            {
              model: db.User
            }
          ]
        }
      ]
    })
    .then(data => {
      const resObj = data.map(course => {
        return Object.assign(
          {},
          {
            courseId: course.id,
            courseTitle: course.course_title,
            courseLength: course.course_length,
            reviews: course.Reviews.map(review => {
              return Object.assign(
                {},
                {
                  reviewTitle: review.review_title,
                  reviewText: review.review_text,
                  username: review.User.username,
                  firstName: review.User.first_name
                })
            })
          })
      });
      res.json(resObj)
    });
  });

  // GET ALL PROGRESSES
  app.get("/api/progresses/", function(req, res) {
    // START WITH COURSE
    // COURSE hasMany PROGRESS; PROGRESS belongsTo USER
    db.Course.findAll({
      include: [
        {
          model: db.Progress,
          include: [
            {
              model: db.User
            }
          ]
        }
      ]
    })
    .then(data => {
      const resObj = data.map(course => {
        return Object.assign(
          {},
          { 
            courseId: course.id,
            courseTitle: course.course_title,
            courseLength: course.progress_length,
            progress: course.Progresses.map(progress =>{
              return Object.assign(
                {},
                {
                  progressId: progress.id,
                  progress: progress.current_progress,
                  username: progress.User.username,
                  completed: progress.completed
                })
            })
          })
      });
      res.json(resObj)
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

  // CREATE USER API - FOR MICHELLE
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

  // POST A REVIEW
  app.post("/api/reviews/post/", function(req, res) {
    console.log(req.body);
    db.Review.create({
      review_title: req.body.reviewTitle,
      review_text: req.body.reviewText,
      CourseId: req.body.courseId,
      UserId: req.body.userId
    })
    .then(function(data) {
      //res.json(data);
      redirect("/");
    })
  });

  // UPDATE A PROGRESS
  app.put("/api/progress/update/", function(req, res) {
    console.log(req.body);
    // CHECK IF THE USER ALREADY COMPLETED THE COURSE - UPDATE FRONTEND 
    if (req.body.complete) {
      return alert("already completed course!");
    } else if (req.body.progress = req.body.courseLength) {
      db.Progress.update(
        {
          current_progress: req.body.progress + 1,
          completed: 1
        },
        {
          where: {
            id: req.params.progressId
          }
        })
      .then(function(data){
        //res.json(data);
        redirect("/");
      })
    } else {
      db.Progress.update(
        {
          current_progress: req.body.progress + 1,
        },
        {
          where: {
            id: req.params.progressId
          }
        })
      .then(function(data) {
        //res.json(data);
        redirect("/");
      })
    }
  });

//   // DELETE route for deleting posts
//   app.delete("/api/posts/:id", function(req, res) {
//     db.User.destroy({
//       where: {
//         id: req.params.id
//       }
//     })
//     .then(function(data) {
//       res.json(data);
//     });
//   });

//   // PUT route for updating posts
//   app.put("/api/posts", function(req, res) {
//     db.User.update(req.body,
//       {
//         where: {
//           id: req.body.id
//         }
//       })
//     .then(function(data) {
//       res.json(data);
//     });
//   });


  // // POST route for saving a new post
  // app.post("/api/posts", function(req, res) {
  //   console.log(req.body);
  //   db.User.create({
  //     username: req.body.username,
  //     password: req.body.password,
  //     first_name: req.body.first_name
  //   })
  //   .then(function(data) {
  //     res.json(data);
  //   });
  // });



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



  // // Get route for returning posts of a specific category
  // app.get("/api/posts/category/:username", function(req, res) {
  //   db.User.findAll({
  //     where: {
  //       username: req.params.username
  //     }
  //   })
  //   .then(function(data) {
  //     res.json(data);
  //   });
  // });

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

//   // POST route for saving a new post
//   app.post("/api/posts", function(req, res) {
//     console.log(req.body);
//     db.User.create({
//       username: req.body.username,
//       password: req.body.password,
//       first_name: req.body.first_name
//     })
//     .then(function(data) {
//       res.json(data);
//     });
//   });

//   // DELETE route for deleting posts
//   app.delete("/api/posts/:id", function(req, res) {
//     db.User.destroy({
//       where: {
//         id: req.params.id
//       }
//     })
//     .then(function(data) {
//       res.json(data);
//     });
//   });

//   // PUT route for updating posts
//   app.put("/api/posts", function(req, res) {
//     db.User.update(req.body,
//       {
//         where: {
//           id: req.body.id
//         }
//       })
//     .then(function(data) {
//       res.json(data);
//     });
//   });
};
