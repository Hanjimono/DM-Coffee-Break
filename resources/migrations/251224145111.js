async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("tagToSong", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    tagId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    songId: {
      type: Sequelize.INTEGER,
      allowNull: false
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
  await queryInterface.dropTable("tagToSong")
}

module.exports = { up, down }
