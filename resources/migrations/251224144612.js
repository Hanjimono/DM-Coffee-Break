async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("mediaCategory", {
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
    hex: {
      type: Sequelize.STRING
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
  await queryInterface.dropTable("mediaCategory")
}

module.exports = { up, down }
