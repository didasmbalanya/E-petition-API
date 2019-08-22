import PetitonService from '../services/PetitionServices';
import Util from '../utils/Utils';

const util = new Util();

class PetitionController {
    static async addPetition(req, res) {
        const votes = 0;
        const expired = false;
        const { title, description } = req.body;
        let user_id = 1; // get from the token
        const newPetition = {
            user_id, title, description, votes, expired
        }
        try {
            const createdPetition = await PetitonService.addPetition(newPetition);
            console.log('-----', createdPetition);
            
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
}

export default PetitionController;
