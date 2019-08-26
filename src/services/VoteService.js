/* eslint-disable max-len */
/* eslint-disable no-useless-catch */
import database from '../models';

class voteService {
  static async addVote(newVote) {
    try {
      return await database.votes.create(newVote);
    } catch (error) {
      throw error;
    }
  }

  static async findVote(id1, id2) {
    try {
      const theVote = await database.votes.findOne({
        where: { user_id: Number(id1), petition_id: Number(id2) },
      });

      return theVote;
    } catch (error) {
      throw error;
    }
  }

  static async updateVote(id1, id2, updateVote) {
    try {
      const voteToUpdate = await database.votes.findOne({
        where: { user_id: Number(id1), petition_id: Number(id2) },
      });

      if (voteToUpdate) {
        await database.votes.update(updateVote, { where: { user_id: Number(id1), petition_id: Number(id2) } });
        return updateVote;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}
export default voteService;
