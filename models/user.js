module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 40]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 40]
      }
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 40]
      }
    },
    date_created: {
      type: DataTypes.DATE
    }
  },
  {
    // CREATE ASSOCIATIONS BETWEEN USERS & COURSES & REVIEWS & PROGRESSES
    classMethods: {
      associate: function(models) {
        // USERS hasMany COURSES; COURSES belongsTo USERS
        User.hasMany(models.Course, {
          onDelete: "cascade"
        });
        // USERS hasMany REVIEWS; REVIEWS belongsTo USERS
        User.hasMany(models.Review, {
          onDelete: "cascade"
        });
        // USERS hasMany PROGRESSES; PROGRESSES belongsTo USERS
        User.hasMany(models.Progress, {
          onDelete: "cascade"
        });
      }
    }
  }
  );
  return User;
};
