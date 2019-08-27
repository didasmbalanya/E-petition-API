/* eslint-disable consistent-return */
/* eslint-disable no-restricted-globals */
/* eslint-disable lines-between-class-members */
/* eslint-disable no-empty-function */
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

      static async upVote(req, res) {
        if (isNaN(req.params.id)) {
            util.setError(400, 'Petition id must be an Integer');
            return util.send(res);
          }
        const petition = await db.petitions.findOne({ where: { id: Number(req.params.id) } });
        if (!petition) {
            util.setError(400, 'Petition does not exist');
            return util.send(res);
            }
        // eslint-disable-next-line camelcase

            // eslint-disable-next-line camelcase
            const petition_id = req.params.id;
            const newVote = {
                petition_id,
                user_id: req.user.id,
                vote: true,
            };
            const alteredVote = {
                vote: true,
            };
            const displayUp = {
                petition_id: req.params.id,
                title: petition.dataValues.title,
                user_id: req.user.id,
                votes: petition.dataValues.votes + 1,
            };
            // search if user already voted on certain petition
            const theVote = await voteService.findVote(req.user.id, petition_id);
            if (theVote) {
                if (theVote.dataValues.vote === true) {
                        util.setError(409, 'You can not vote twice with the same choice');
                        return util.send(res);
                }
                if (theVote.dataValues.vote === false) {
                        const updatePetition = await PetitionService.upVote(petition_id);
                        // eslint-disable-next-line max-len
                        const updateVote = await voteService.updateVote(req.user.id, petition_id, alteredVote);
                        util.setSuccess(200, 'Vote updated!', displayUp);
                        return util.send(res);
                }
            } else {
                // else add new vote
                const createVote = await voteService.addVote(newVote);
                const updatePetition = await PetitionService.upVote(petition_id);
                util.setSuccess(201, 'Vote Added!', displayUp);
                return util.send(res);
            }
      }
      static async downVote(req, res) {
        if (isNaN(req.params.id)) {
            util.setError(400, 'Petition id must be an Integer');
            return util.send(res);
          }
        const petition = await db.petitions.findOne({ where: { id: Number(req.params.id) } });
        if (!petition) {
            util.setError(400, 'Petition does not exist');
            return util.send(res);
            }
        // eslint-disable-next-line camelcase

            // eslint-disable-next-line camelcase
            const petition_id = req.params.id;
            const newVote = {
                petition_id,
                user_id: req.user.id,
                vote: false,
            };
            const alteredVote = {
                vote: false,
            };
            const displayDown = {
                petition_id: req.params.id,
                title: petition.dataValues.title,
                user_id: req.user.id,
                votes: petition.dataValues.votes - 1,
            };
            // search if user already voted on certain petition
            const theVote = await voteService.findVote(req.user.id, petition_id);
            if (theVote) {
                if (theVote.dataValues.vote === true) {
                        const updatePetition = await PetitionService.downVote(petition_id);
                        // eslint-disable-next-line max-len
                        const updateVote = await voteService.updateVote(req.user.id, petition_id, alteredVote);
                        util.setSuccess(200, 'Vote updated!', displayDown);
                        return util.send(res);
                }
                if (theVote.dataValues.vote === false) {
                        util.setError(409, 'You can not vote twice with the same choice');
                        return util.send(res);
                }
            } else {
                // else add new vote
                const createVote = await voteService.addVote(newVote);
                // alter petitions table waiting for petitions services
                    const updatePetition = await PetitionService.downVote(petition_id);
                util.setSuccess(201, 'Vote Added!', displayDown);
                return util.send(res);
            }
    }
}
export default voteController;
