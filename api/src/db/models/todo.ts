import {DataTypes, Model, Optional} from "sequelize";
import connection from '../../config/db-connect'
import User from "./user";

export interface TodoAttributes {
  id?: string;
  description?: string;
  complete?: boolean;
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date
}

class Todo extends Model<TodoAttributes, Optional<TodoAttributes, 'id'>> implements TodoAttributes {
  public readonly id!: string;
  public description!: string;
  public complete?: boolean;
  public userId!: string;
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Todo.init({
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  description: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  complete: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  userId: {
    allowNull: false,
    type: DataTypes.UUID,
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
  tableName: 'todos',
})


export default Todo
