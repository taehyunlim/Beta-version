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
    },
  },
  {
    classMethods: {
      associate: function(models) {
        Course.belongsTo(models.User, {
          //onDelete: "cascade"
        });
      }
    }
  }
  );
  return Course;
};
