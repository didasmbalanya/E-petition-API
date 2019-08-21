export default (sequelize, DataTypes) => {
  const petitions = sequelize.define('petitions', {
    id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    votes: DataTypes.INTEGER,
    expired: DataTypes.BOOLEAN,
  }, {});
  petitions.associate = (models) => {
    petitions.belongsTo(models.users, {
      onDelete: 'CASCADE',
      foreignKey: 'user_id',
    });
    petitions.hasMany(models.flags, {
      onDelete: 'CASCADE',
      foreignKey: 'petition_id',
    });
    petitions.hasMany(models.votes, {
      onDelete: 'CASCADE',
      foreignKey: 'petition_id',
    });
  };
  return petitions;
};
