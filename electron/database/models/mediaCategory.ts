import { DataTypes, Model } from "sequelize"
import { sequelize } from "../connect"

/**
 * Represents the media category model in the database.
 * It contains the title and the color of the category.
 *
 * @extends Model
 */
export class MediaCategory extends Model {
  public id!: number
  public title!: string
  public hex!: string
}

MediaCategory.init(
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
    hex: {
      type: DataTypes.STRING
    }
  },
  {
    sequelize,
    modelName: "mediaCategory"
  }
)
