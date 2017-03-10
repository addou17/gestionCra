import { Activite } from '../activite';
export class Action {
    constructor(
        public id?: number,
        public description?: string,
        public activite?: Activite,
    ) {
    }
}
