async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("song", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    artist: {
      type: Sequelize.STRING
    },
    duration: {
      type: Sequelize.INTEGER
    },
    thumbnail: {
      type: Sequelize.STRING
    },
    url: {
      type: Sequelize.STRING,
      allowNull: false
    },
    comment: {
      type: Sequelize.STRING
    },
    source: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    categoryId: {
      type: Sequelize.INTEGER
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false
    }
  })
}

async function down(queryInterface) {
  await queryInterface.dropTable("song")
}

module.exports = { up, down }
