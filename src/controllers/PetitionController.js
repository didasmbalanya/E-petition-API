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
    const user_id = 1; // get from the token
    const newPetition = {
      user_id, title, description, votes, expired,
    };
    try {
      const createdPetition = await PetitonService.addPetition(newPetition);

      if (createdPetition === 'exists') {
        util.setError(409, `Petition with the title: '${title}' already exists`);
        return util.send(res);
      }
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
}

export default PetitionController;
