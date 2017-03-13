import { Client } from '../client';
export class AffectationClient {
    constructor(
        public id?: number,
        public owner?: number,
        public dateDebutMission?: any,
        public dateFinMission?: any,
        public client?: Client,
    ) {
    }
}
