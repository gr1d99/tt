import {DataTypes, Model, Optional} from "sequelize";
import connection from '../../config/db-connect'
import {HookReturn} from "sequelize/types/hooks";
import {ValidationOptions} from "sequelize/types/instance-validator";

export interface UserAttributes {
  id?: string;
  email?: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date
}

class User extends Model<UserAttributes, Optional<UserAttributes, 'id'>> implements UserAttributes {
  public readonly id!: string;
  public email!: string;
  public password!: string;
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

User.init({
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE
  }
}, {
  sequelize: connection,
  underscored: false,
  tableName: 'users',
  hooks: {
    beforeValidate(instance: User): HookReturn {
      instance.email = instance.email.trim()
    }
  },
  defaultScope: {
    attributes: {
      exclude: ['password']
    }
  }
})

export default User
