import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager } from 'ng-jhipster';

import { AffectationClient } from './affectation-client.model';
import { AffectationClientPopupService } from './affectation-client-popup.service';
import { AffectationClientService } from './affectation-client.service';

@Component({
    selector: 'jhi-affectation-client-delete-dialog',
    templateUrl: './affectation-client-delete-dialog.component.html'
})
export class AffectationClientDeleteDialogComponent {

    affectationClient: AffectationClient;

    constructor(
        private affectationClientService: AffectationClientService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.affectationClientService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'affectationClientListModification',
                content: 'Deleted an affectationClient'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-affectation-client-delete-popup',
    template: ''
})
export class AffectationClientDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private affectationClientPopupService: AffectationClientPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.affectationClientPopupService
                .open(AffectationClientDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
