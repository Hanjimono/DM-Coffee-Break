import { DataTypes, Model, Op } from "sequelize"
import { sequelize } from "../connect"
import { AVAILABLE_MEDIA_SOURCES } from "@cross/types/media/song"
import { TagToSong } from "./tagToSong"
import { SongInfo } from "@cross/types/database/media"

/**
 * Represents the song model in the database.
 * It contains all basic information about a song, uploaded as file or parsed from a URL.
 *
 * @extends Model
 */
export class Song extends Model {
  public id!: number
  public title!: string
  public artist!: string
  public duration!: number
  public thumbnail!: string
  public url!: string
  public comment!: string
  public source!: number
  public categoryId!: number

  async getInfo(): Promise<SongInfo> {
    const tags = await TagToSong.getTagsForSong(this.id)
    return {
      id: this.id,
      title: this.title,
      artist: this.artist,
      duration: this.duration,
      thumbnail: this.thumbnail,
      url: this.url,
      comment: this.comment,
      source: this.source as AVAILABLE_MEDIA_SOURCES,
      categoryId: this.categoryId,
      tags: tags
    }
  }

  async setTags(tags: number[]): Promise<void> {
    await TagToSong.destroy({
      where: {
        songId: this.id,
        tagId: {
          [Op.notIn]: tags
        }
      }
    })

    const currentTags = await TagToSong.getTagsForSong(this.id)
    const tagsToAdd = tags.filter((tag) => !currentTags.includes(tag))
    await TagToSong.bulkCreate(
      tagsToAdd.map((tagId) => ({
        tagId,
        songId: this.id
      }))
    )
  }
}

Song.init(
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
    artist: {
      type: DataTypes.STRING
    },
    duration: {
      type: DataTypes.INTEGER
    },
    thumbnail: {
      type: DataTypes.STRING
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    comment: {
      type: DataTypes.STRING
    },
    source: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    categoryId: {
      type: DataTypes.INTEGER
    }
  },
  {
    sequelize,
    modelName: "song",
    tableName: "song"
  }
)
