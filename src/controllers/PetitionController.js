/* eslint-disable lines-between-class-members */
/* eslint-disable camelcase */
/* eslint-disable no-useless-catch */
import PetitonService from '../services/PetitionServices';
import Util from '../utils/Utils';
import db from '../models';

const util = new Util();

class PetitionController {
  static async addPetition(req, res) {
    const votes = 0;
    const expired = false;
    const { title, description } = req.body;
    // eslint-disable-next-line camelcase
    const user_id = req.user.id;
    const newPetition = {
      user_id, title, description, votes, expired,
    };
    const checkExist = await PetitonService.checkExists(title);
    if (checkExist) {
      util.setError(409, `Petition with the title: '${title}' already exists`);
      return util.send(res);
    }
    try {
      const createdPetition = await PetitonService.addPetition(newPetition);
      util.setSuccess(201, 'Petition successifully created', createdPetition);
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  // eslint-disable-next-line consistent-return
  static async deletePetition(req, res) {
    try {
      const petition = await db.petitions.findOne({ where: { id: Number(req.params.id) } });
      if (!petition) { return res.json({ status: 400, message: 'the petition with the given id does not exists' }); }

      if (req.user.is_admin === true) {
        await db.petitions.destroy({ where: { id: Number(req.params.id) } });
        return res.json({ status: 200, message: 'petition has been deleted successfully' });
      }

      if (petition.user_id !== req.user.id) { return res.json({ status: 403, message: 'Access denied, this petition is not yours' }); }

      await db.petitions.destroy({ where: { id: Number(req.params.id) } });
      res.json({ status: 200, message: 'petition has been deleted successfully' });
    } catch (error) {
      throw (error);
    }
  }
  // eslint-disable-next-line consistent-return
  static async viewSpecificPetition(req, res) {
    try {
      const petition = await db.petitions.findOne({ where: { id: Number(req.params.id) } });
      if (!petition) {
        util.setError(400, 'Petition does not exist');
        return util.send(res);
      }
      const votesFor = await db.votes.count({ where: { petition_id: Number(req.params.id), vote: 'TRUE' } });
      const votesAgainst = await db.votes.count({ where: { petition_id: Number(req.params.id), vote: 'FALSE' } });

      const votes = {
        id: petition.id,
        title: petition.title,
        description: petition.description,
        votesFor,
        votesAgainst,
      };
      // eslint-disable-next-line no-console

      util.setSuccess(200, 'All Votes!', votes);
      return util.send(res);
    } catch (error) {
      throw (error);
    }
  }

  // eslint-disable-next-line consistent-return
  static async viewPetitions(req, res) {
    try {
      const petitions = await db.petitions.findAll();

      const allPetitions = [];
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < petitions.length; i++) {
        allPetitions.push(petitions[i].dataValues);
      }

      if (allPetitions.length > 0) res.json({ status: 200, message: 'All petitions', data: allPetitions });
      else res.json({ status: 200, message: 'No petitions found' });
    } catch (error) {
      throw (error);
    }
  }
}

export default PetitionController;
