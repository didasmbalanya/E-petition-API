/* eslint-disable no-useless-catch */
import database from '../models';

class PetitionService {
  static async addPetition(newPetiton) {
    try {
      return await database.petitions.create(newPetiton);
    } catch (error) {
      throw error;
    }
  }

  // eslint-disable-next-line no-unused-vars
  static async upVote(id, newVote) {
    try {
      const petitionToUpdate = await database.petitions.findOne({
        where: { id: Number(id) },
      });
      if (petitionToUpdate) {
        const newupVote = {
          votes: petitionToUpdate.dataValues.votes + 1,
        };
        await database.petitions.update(newupVote, { where: { id: Number(id) } });
        return newupVote;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  // eslint-disable-next-line no-unused-vars
  static async downVote(id, newVote) {
    try {
      const petitionToUpdate = await database.petitions.findOne({
        where: { id: Number(id) },
      });
      if (petitionToUpdate) {
        const newdownVote = {
          votes: petitionToUpdate.dataValues.votes - 1,
        };
        await database.petitions.update(newdownVote, { where: { id: Number(id) } });
        return newdownVote;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default PetitionService;
