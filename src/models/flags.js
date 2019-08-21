export default (sequelize, DataTypes) => {
  const flags = sequelize.define('flags', {
    petition_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
  }, {});
  flags.associate = (models) => {
    flags.belongsTo(models.users, {
      foreignKey: 'user_id',
    });
    flags.belongsTo(models.petitions, {
      foreignKey: 'petition_id',
    });
  };
  return flags;
};
