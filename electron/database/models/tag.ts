import { DataTypes, Model } from "sequelize"
import { sequelize } from "../connect"

/**
 * Represents the tag model in the database.
 * It contains a list of available tags with their title and color.
 *
 * @extends Model
 */
export class Tag extends Model {
  public id!: number
  public title!: string
  public color!: string
}

Tag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    color: {
      type: DataTypes.STRING
    }
  },
  {
    sequelize,
    modelName: "tag",
    tableName: "tag"
  }
)
