async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("settings", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    key: {
      type: Sequelize.STRING,
      allowNull: false
    },
    value: {
      type: Sequelize.STRING
    },
    category: {
      type: Sequelize.NUMBER,
      defaultValue: 0
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
  await queryInterface.dropTable("settings")
}

module.exports = { up, down }
