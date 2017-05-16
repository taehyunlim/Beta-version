module.exports = function(sequelize, DataTypes) {
  var Progress = sequelize.define("Progress", {
    current_progress: {
      type: DataTypes.INTEGER,
    },
    completed: {
      type: DataTypes.BOOLEAN
    }
  },
  // CREATE ASSOCIATIONS BETWEEN PROGRESSES AND COURSES AND USERS
  { 
    classMethods: {
      associate: function(models) {
        // PROGRESSES belongsTo COURSES; COURSES hasMany PROGRESSES
        Progress.belongsTo(models.Course, {
          //onDelete: "cascade"
          foreignKey: {
            allowNull: false
          }
        });
        // PROGRESSES belongsTo USERS; USERS hasMany PROGRESSES
        Progress.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  }
  );
  return Progress;
};

//progress_id course_id (foreign key) user_id (foreign key) progress  completed