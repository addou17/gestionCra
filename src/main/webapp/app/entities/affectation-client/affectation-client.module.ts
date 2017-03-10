import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestioncraSharedModule } from '../../shared';

import {
    AffectationClientService,
    AffectationClientPopupService,
    AffectationClientComponent,
    AffectationClientDetailComponent,
    AffectationClientDialogComponent,
    AffectationClientPopupComponent,
    AffectationClientDeletePopupComponent,
    AffectationClientDeleteDialogComponent,
    affectationClientRoute,
    affectationClientPopupRoute,
} from './';

let ENTITY_STATES = [
    ...affectationClientRoute,
    ...affectationClientPopupRoute,
];

@NgModule({
    imports: [
        GestioncraSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        AffectationClientComponent,
        AffectationClientDetailComponent,
        AffectationClientDialogComponent,
        AffectationClientDeleteDialogComponent,
        AffectationClientPopupComponent,
        AffectationClientDeletePopupComponent,
    ],
    entryComponents: [
        AffectationClientComponent,
        AffectationClientDialogComponent,
        AffectationClientPopupComponent,
        AffectationClientDeleteDialogComponent,
        AffectationClientDeletePopupComponent,
    ],
    providers: [
        AffectationClientService,
        AffectationClientPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestioncraAffectationClientModule {}
