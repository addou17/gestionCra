import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager } from 'ng-jhipster';

import { Activite } from './activite.model';
import { ActivitePopupService } from './activite-popup.service';
import { ActiviteService } from './activite.service';

@Component({
    selector: 'jhi-activite-delete-dialog',
    templateUrl: './activite-delete-dialog.component.html'
})
export class ActiviteDeleteDialogComponent {

    activite: Activite;

    constructor(
        private activiteService: ActiviteService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.activiteService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'activiteListModification',
                content: 'Deleted an activite'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-activite-delete-popup',
    template: ''
})
export class ActiviteDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private activitePopupService: ActivitePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.activitePopupService
                .open(ActiviteDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
