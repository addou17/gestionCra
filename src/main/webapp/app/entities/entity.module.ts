import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { GestioncraActionModule } from './action/action.module';
import { GestioncraActiviteModule } from './activite/activite.module';
import { GestioncraAffectationClientModule } from './affectation-client/affectation-client.module';
import { GestioncraClientModule } from './client/client.module';
import { GestioncraUtilisateurModule } from './utilisateur/utilisateur.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        GestioncraActionModule,
        GestioncraActiviteModule,
        GestioncraAffectationClientModule,
        GestioncraClientModule,
        GestioncraUtilisateurModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestioncraEntityModule {}
