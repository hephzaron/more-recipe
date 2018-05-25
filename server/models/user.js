import { hashPassword, verifyPassword } from '../helpers/passwordHash';

/**
 * User Model
 * @param { object } sequelize
 * @param { object } DataTypes
 * @returns { object } User
 */
export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      validate: {
        not: {
          args: /^[A-Z]+$/i,
          msg: 'Recipe Id must be integer'
        }
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'The firstName field is required'
        },
        is: {
          args: /^(\w\s?)+$/i,
          msg: 'Firstname must contain alphanumeric characters and single space only'
        },
        min: 3
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'The lastName field is required'
        },
        is: {
          args: /^(\w\s?)+$/i,
          msg: 'Lastname must contain alphanumeric characters and single space only'
        },
        min: 3
      }
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hash: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'The email field is required'
        },
        isEmail: {
          args: true,
          msg: 'Email entry not valid'
        },
        isUnique(email, next) {
          return User.find({
            where: { email },
            attributes: ['id']
          }).done((error) => {
            if (!error) {
              next();
            }
            return next('This email already belongs to a user');
          });
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'The username field is required'
        },
        is: {
          args: /^(\w\s?)+$/i,
          msg: 'Username must contain alphanumeric characters and single space only'
        },
        min: 3
      }
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'The age field is required'
        },
        is: {
          args: /^([1-9]\d{0,2})$/,
          msg: 'Age must be between 1-999'
        }
      }
    },
    sex: {
      type: DataTypes.ENUM('Male', 'Female'),
      allowNull: false
    },
    facebookOauthID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    googleOauthID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    resetPasswordToken: {
      type: DataTypes.STRING,
      allowNull: true
    },
    resetPasswordExpires: {
      type: DataTypes.DATE,
      allowNull: true
    }
  });

  /**
   * Generate password hash
   * @method generateHash
   * @memberof User
   * @param { string } password
   * @return { object } salt and hash
   */
  User.generateHash = (password) => {
    if (password === null || password === undefined) return '';
    const { salt, hash } = hashPassword(password);
    return { salt, hash };
  };

  /**
   * Validates user password
   * @method validPassword
   * @memberof User
   * @param { string } password
   * @returns { boolean } validPassword
   */
  User.prototype.validPassword = function validatePassword(password) {
    const { validPassword } = verifyPassword(password, this.salt, this.hash);
    return validPassword;
  };

  User.associate = (models) => {
    User.belongsToMany(models.Recipe, {
      through: models.SavedRecipe,
      foreignKey: 'userId',
      as: 'savedRecipe',
      onDelete: 'CASCADE'
    });
    User.hasMany(models.Recipe, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return User;
};