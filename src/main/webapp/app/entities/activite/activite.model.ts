import { Utilisateur } from '../utilisateur';
import { Action } from '../action';
export class Activite {
    constructor(
        public id?: number,
        public date?: any,
        public estValide?: boolean,
        public commentaire?: string,
        public utilisateur?: Utilisateur,
        public activite?: Action,
    ) {
        this.estValide = false;
    }
}
