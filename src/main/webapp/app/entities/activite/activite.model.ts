import { Action } from '../action';
export class Activite {
    constructor(
        public id?: number,
        public owner?: number,
        public date?: any,
        public estValide?: boolean,
        public commentaire?: string,
        public activite?: Action,
    ) {
        this.estValide = false;
    }
}
