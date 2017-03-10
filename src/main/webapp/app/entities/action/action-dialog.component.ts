import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { Action } from './action.model';
import { ActionPopupService } from './action-popup.service';
import { ActionService } from './action.service';
import { Activite, ActiviteService } from '../activite';
@Component({
    selector: 'jhi-action-dialog',
    templateUrl: './action-dialog.component.html'
})
export class ActionDialogComponent implements OnInit {

    action: Action;
    authorities: any[];
    isSaving: boolean;

    activites: Activite[];
    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private actionService: ActionService,
        private activiteService: ActiviteService,
        private eventManager: EventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.activiteService.query().subscribe(
            (res: Response) => { this.activites = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.action.id !== undefined) {
            this.actionService.update(this.action)
                .subscribe((res: Action) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.actionService.create(this.action)
                .subscribe((res: Action) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: Action) {
        this.eventManager.broadcast({ name: 'actionListModification', content: 'OK'});
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

    trackActiviteById(index: number, item: Activite) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-action-popup',
    template: ''
})
export class ActionPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private actionPopupService: ActionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.actionPopupService
                    .open(ActionDialogComponent, params['id']);
            } else {
                this.modalRef = this.actionPopupService
                    .open(ActionDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
