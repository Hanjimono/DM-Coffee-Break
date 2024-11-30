import { DataTypes, Model } from "sequelize"
import { sequelize } from "../connect"

/**
 * Represents the tagToSong model in the database.
 * It contains a list of tags assigned to songs.
 *
 * @extends Model
 */
export class TagToSong extends Model {
  public id!: number
  public tagId!: number
  public songId!: number

  static getTagsForSong(songId: number): Promise<number[]> {
    return TagToSong.findAll({
      where: {
        songId
      }
    }).then((tags) => tags.map((tag) => tag.tagId))
  }
}

TagToSong.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    tagId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    songId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize
  }
)
