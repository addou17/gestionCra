
const enum TypeUtilisateur {
    'ADMINISTRATEUR',
    'CONSULTANT'

};
import { AffectationClient } from '../affectation-client';
import { Activite } from '../activite';
export class Utilisateur {
    constructor(
        public id?: number,
        public nom?: string,
        public prenom?: string,
        public telephone?: number,
        public mail?: string,
        public adresse?: string,
        public typeUtilisateur?: TypeUtilisateur,
        public utilisateur?: AffectationClient,
        public utilisateur1?: Activite,
    ) {
    }
}
