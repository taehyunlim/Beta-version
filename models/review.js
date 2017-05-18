module.exports = function(sequelize, DataTypes) {
  var Review = sequelize.define("Review", {
    review_title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 80]
      }
    },
    review_text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 255]
      }
    }
  },
  // CREATE ASSOCIATIONS BETWEEN COURSES AND REVIEWS AND USERS
  { 
    classMethods: {
      associate: function(models) {
        // REVIEWS belongsTo COURSES; COURSES hasMany REVIEWS
        Review.belongsTo(models.Course, {
          //onDelete: "cascade"
          foreignKey: {
            allowNull: false
          }
        });
        // REVIEWS belongsTo USERS; USERS hasMany REVIEWS
        Review.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  },
  {
    // FOR SOME REASON, THIS DOES NOT WORK
    timestamps: false
  }
  );
  return Review;
};
