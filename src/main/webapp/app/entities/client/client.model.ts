import { AffectationClient } from '../affectation-client';
export class Client {
    constructor(
        public id?: number,
        public nom?: string,
        public adresse?: string,
        public mail?: string,
        public telephone?: number,
        public client?: AffectationClient,
    ) {
    }
}
