'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Rooms', 'username', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Anonymous'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Rooms', 'username');
  }
};