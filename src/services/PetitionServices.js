import database from '../models';

class PetitonService {
    static async addPetition(newPetiton) {
        try {
            return await database.petitions.create(newPetiton);
        } catch (error) {
            throw error;
        }
    }
}

export default PetitonService;
