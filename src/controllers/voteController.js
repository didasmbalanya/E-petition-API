/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import dotenv from 'dotenv';
import voteService from '../services/VoteService';
import PetitionService from '../services/PetitionServices';
import Util from '../utils/Utils';
import db from '../models';

const util = new Util();

class voteController {
  // eslint-disable-next-line consistent-return
  static async addVote(req, res) {
        if (!req.body.vote || !req.params) {
          util.setError(400, 'Please provide complete details');
          return util.send(res);
        }
        const petition = await db.petitions.findOne({ where: { id: Number(req.params.id) } });
        if (!petition) {
            util.setError(400, 'Petition does not exist');
            return util.send(res);
            }
        // eslint-disable-next-line camelcase

        try {
            const { vote } = req.body;
            // eslint-disable-next-line camelcase
            const petition_id = req.params.id;
            const newVote = {
                petition_id,
                user_id: req.user.id,
                vote,
            };
            const alteredVote = req.body;
            // search if user already voted on certain petition
            const theVote = await voteService.findVote(req.user.id, petition_id);
            if (theVote) {
                if (theVote.dataValues.vote === true) {
                    if (req.body.vote === 'true') {
                        util.setError(409, 'You can not vote twice with the same choice');
                        return util.send(res);
                    }
                    if (req.body.vote === 'false') {
                        const updatePetition = await PetitionService.downVote(petition_id);
                        // eslint-disable-next-line max-len
                        const updateVote = await voteService.updateVote(req.user.id, petition_id, alteredVote);
                        util.setSuccess(200, 'Vote updated!', updateVote);
                        return util.send(res);
                    }
                }
                if (theVote.dataValues.vote === false) {
                    if (req.body.vote === 'true') {
                        const updatePetition = await PetitionService.upVote(petition_id);
                        // eslint-disable-next-line max-len
                        const updateVote = await voteService.updateVote(req.user.id, petition_id, alteredVote);
                        util.setSuccess(200, 'Vote updated!', updateVote);
                        return util.send(res);
                    } if (req.body.vote === 'false') {
                        util.setError(409, 'You can not vote twice with the same choice');
                        return util.send(res);
                    }
                }
            } else {
                // else add new vote
                const createVote = await voteService.addVote(newVote);
                // alter petitions table waiting for petitions services
                // checking user's vote
                if (req.body.vote === true) {
                    const updatePetition = await PetitionService.upVote(petition_id);
                } else {
                    const updatePetition = await PetitionService.downVote(petition_id);
                }
                util.setSuccess(201, 'Vote Added!', createVote);
                return util.send(res);
            }
        } catch (error) {
          util.setError(400, error.message);
          return util.send(res);
        }
      }
}
export default voteController;
