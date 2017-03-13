import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { AffectationClient } from './affectation-client.model';
import { AffectationClientPopupService } from './affectation-client-popup.service';
import { AffectationClientService } from './affectation-client.service';
import { Utilisateur, UtilisateurService } from '../utilisateur';
import { Client, ClientService } from '../client';
@Component({
    selector: 'jhi-affectation-client-dialog',
    templateUrl: './affectation-client-dialog.component.html'
})
export class AffectationClientDialogComponent implements OnInit {

    affectationClient: AffectationClient;
    authorities: any[];
    isSaving: boolean;

    utilisateurs: Utilisateur[];

    clients: Client[];
    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private affectationClientService: AffectationClientService,
        private utilisateurService: UtilisateurService,
        private clientService: ClientService,
        private eventManager: EventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.utilisateurService.query().subscribe(
            (res: Response) => { this.utilisateurs = res.json(); }, (res: Response) => this.onError(res.json()));
        this.clientService.query().subscribe(
            (res: Response) => { this.clients = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.affectationClient.id !== undefined) {
            this.affectationClientService.update(this.affectationClient)
                .subscribe((res: AffectationClient) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.affectationClientService.create(this.affectationClient)
                .subscribe((res: AffectationClient) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: AffectationClient) {
        this.eventManager.broadcast({ name: 'affectationClientListModification', content: 'OK'});
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

    trackUtilisateurById(index: number, item: Utilisateur) {
        return item.id;
    }

    trackClientById(index: number, item: Client) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-affectation-client-popup',
    template: ''
})
export class AffectationClientPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private affectationClientPopupService: AffectationClientPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.affectationClientPopupService
                    .open(AffectationClientDialogComponent, params['id']);
            } else {
                this.modalRef = this.affectationClientPopupService
                    .open(AffectationClientDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
