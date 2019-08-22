import database from '../models';

class PetitonService {
    static async addPetition(newPetiton) {
        // console.log(Object.keys(database.petitions));
        
        try {
            return await database.petitions.create(newPetiton);
        } catch (error) {
            throw error;
        }
    }
}

export default PetitonService;
