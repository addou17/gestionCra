import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { Activite } from './activite.model';
import { ActivitePopupService } from './activite-popup.service';
import { ActiviteService } from './activite.service';
import { Action, ActionService } from '../action';
@Component({
    selector: 'jhi-activite-dialog',
    templateUrl: './activite-dialog.component.html'
})
export class ActiviteDialogComponent implements OnInit {

    activite: Activite;
    authorities: any[];
    isSaving: boolean;

    actions: Action[];
    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private activiteService: ActiviteService,
        private actionService: ActionService,
        private eventManager: EventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.actionService.query().subscribe(
            (res: Response) => { this.actions = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.activite.id !== undefined) {
            this.activiteService.update(this.activite)
                .subscribe((res: Activite) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.activiteService.create(this.activite)
                .subscribe((res: Activite) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: Activite) {
        this.eventManager.broadcast({ name: 'activiteListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError (error) {
        this.isSaving = false;
        this.onError(error);
    }

    private onError (error) {
        this.alertService.error(error.message, null, null);
    }

    trackActionById(index: number, item: Action) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-activite-popup',
    template: ''
})
export class ActivitePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private activitePopupService: ActivitePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.activitePopupService
                    .open(ActiviteDialogComponent, params['id']);
            } else {
                this.modalRef = this.activitePopupService
                    .open(ActiviteDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
