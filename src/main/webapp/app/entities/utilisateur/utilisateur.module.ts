import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestioncraSharedModule } from '../../shared';

import {
    UtilisateurService,
    UtilisateurPopupService,
    UtilisateurComponent,
    UtilisateurDetailComponent,
    UtilisateurDialogComponent,
    UtilisateurPopupComponent,
    UtilisateurDeletePopupComponent,
    UtilisateurDeleteDialogComponent,
    utilisateurRoute,
    utilisateurPopupRoute,
} from './';

let ENTITY_STATES = [
    ...utilisateurRoute,
    ...utilisateurPopupRoute,
];

@NgModule({
    imports: [
        GestioncraSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        UtilisateurComponent,
        UtilisateurDetailComponent,
        UtilisateurDialogComponent,
        UtilisateurDeleteDialogComponent,
        UtilisateurPopupComponent,
        UtilisateurDeletePopupComponent,
    ],
    entryComponents: [
        UtilisateurComponent,
        UtilisateurDialogComponent,
        UtilisateurPopupComponent,
        UtilisateurDeleteDialogComponent,
        UtilisateurDeletePopupComponent,
    ],
    providers: [
        UtilisateurService,
        UtilisateurPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestioncraUtilisateurModule {}
