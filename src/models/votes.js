export default (sequelize, DataTypes) => {
  const votes = sequelize.define('votes', {
    petition_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    vote: DataTypes.BOOLEAN,
  }, {});
  votes.associate = (models) => {
    votes.belongsToMany(models.users, {
      // foreignKey: 'user_id',
      through: 'UserVote',
    });
    votes.belongsTo(models.petitions, {
      foreignKey: 'petition_id',
    });
  };
  return votes;
};
