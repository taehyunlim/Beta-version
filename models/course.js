module.exports = function(sequelize, DataTypes) {
  var Course = sequelize.define("Course", {
    course_title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 80]
      }
    },
    course_cat: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 40]
      }
    },
    course_desc: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 255]
      }
    },
    course_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 40]
      }
    },
    progress_length: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  },
  // CREATE ASSOCIATIONS BETWEEN COURSES & USERS & REVIEWS & PROGRESSES
  {
    classMethods: {
      associate: function(models) {
        // COURSES belongsTo USERS; USERS hasMany COURSES
        Course.belongsTo(models.User, {
          //onDelete: "cascade"
          foreignKey: {
            allowNull: false
          }
        });
        // COURSES hasMany REVIEWS; REVIEWS belongsTo COURSES
        Course.hasMany(models.Review, {
          onDelete: "cascade"
        });
        // COURSES hasMany PROGRESSES; PROGRESSES belongsTo COURSES
        Course.hasMany(models.Progress, {
          onDelete: "cascade"
        });
      }
    }
  },
  {
    timestamps: false
  }
  );
  return Course;
};
