import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { Utilisateur } from './utilisateur.model';
import { UtilisateurPopupService } from './utilisateur-popup.service';
import { UtilisateurService } from './utilisateur.service';
import { AffectationClient, AffectationClientService } from '../affectation-client';
import { Activite, ActiviteService } from '../activite';
@Component({
    selector: 'jhi-utilisateur-dialog',
    templateUrl: './utilisateur-dialog.component.html'
})
export class UtilisateurDialogComponent implements OnInit {

    utilisateur: Utilisateur;
    authorities: any[];
    isSaving: boolean;

    affectationclients: AffectationClient[];

    activites: Activite[];
    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private utilisateurService: UtilisateurService,
        private affectationClientService: AffectationClientService,
        private activiteService: ActiviteService,
        private eventManager: EventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.affectationClientService.query().subscribe(
            (res: Response) => { this.affectationclients = res.json(); }, (res: Response) => this.onError(res.json()));
        this.activiteService.query().subscribe(
            (res: Response) => { this.activites = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.utilisateur.id !== undefined) {
            this.utilisateurService.update(this.utilisateur)
                .subscribe((res: Utilisateur) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.utilisateurService.create(this.utilisateur)
                .subscribe((res: Utilisateur) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: Utilisateur) {
        this.eventManager.broadcast({ name: 'utilisateurListModification', content: 'OK'});
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

    trackAffectationClientById(index: number, item: AffectationClient) {
        return item.id;
    }

    trackActiviteById(index: number, item: Activite) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-utilisateur-popup',
    template: ''
})
export class UtilisateurPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private utilisateurPopupService: UtilisateurPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.utilisateurPopupService
                    .open(UtilisateurDialogComponent, params['id']);
            } else {
                this.modalRef = this.utilisateurPopupService
                    .open(UtilisateurDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
