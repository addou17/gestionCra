import { Utilisateur } from '../utilisateur';
import { Client } from '../client';
export class AffectationClient {
    constructor(
        public id?: number,
        public dateDebutMission?: any,
        public dateFinMission?: any,
        public utilisateur?: Utilisateur,
        public client?: Client,
    ) {
    }
}
