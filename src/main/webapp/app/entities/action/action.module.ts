import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestioncraSharedModule } from '../../shared';

import {
    ActionService,
    ActionPopupService,
    ActionComponent,
    ActionDetailComponent,
    ActionDialogComponent,
    ActionPopupComponent,
    ActionDeletePopupComponent,
    ActionDeleteDialogComponent,
    actionRoute,
    actionPopupRoute,
} from './';

let ENTITY_STATES = [
    ...actionRoute,
    ...actionPopupRoute,
];

@NgModule({
    imports: [
        GestioncraSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ActionComponent,
        ActionDetailComponent,
        ActionDialogComponent,
        ActionDeleteDialogComponent,
        ActionPopupComponent,
        ActionDeletePopupComponent,
    ],
    entryComponents: [
        ActionComponent,
        ActionDialogComponent,
        ActionPopupComponent,
        ActionDeleteDialogComponent,
        ActionDeletePopupComponent,
    ],
    providers: [
        ActionService,
        ActionPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestioncraActionModule {}
