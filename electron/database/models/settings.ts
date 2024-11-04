import { DataTypes, Model } from "sequelize"
import { sequelize } from "../connect"
import { SETTINGS_CATEGORIES } from "../../../cross/database/constants/settingsCategories"

/**
 * Represents the settings model in the database.
 * It can contain any kind of settings. Every value is stored as a string, so if you want to store a
 * different type, you should convert it before storing or after retrieving it.
 *
 * @extends Model
 */
export class Settings extends Model {
  public id!: number
  public key!: string
  public value!: string
  public category!: number
}

Settings.init(
  {
    id: {
      type: DataTypes.NUMBER,
      allowNull: false,
      primaryKey: true
    },
    key: {
      type: DataTypes.STRING,
      allowNull: false
    },
    value: {
      type: DataTypes.STRING
    },
    category: {
      type: DataTypes.NUMBER,
      defaultValue: SETTINGS_CATEGORIES.EMPTY
    }
  },
  {
    sequelize
  }
)
