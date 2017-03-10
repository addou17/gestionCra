import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, AlertService } from 'ng-jhipster';

import { Utilisateur } from './utilisateur.model';
import { UtilisateurService } from './utilisateur.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-utilisateur',
    templateUrl: './utilisateur.component.html'
})
export class UtilisateurComponent implements OnInit, OnDestroy {
utilisateurs: Utilisateur[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private utilisateurService: UtilisateurService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.utilisateurService.query().subscribe(
            (res: Response) => {
                this.utilisateurs = res.json();
            },
            (res: Response) => this.onError(res.json())
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInUtilisateurs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId (index: number, item: Utilisateur) {
        return item.id;
    }



    registerChangeInUtilisateurs() {
        this.eventSubscriber = this.eventManager.subscribe('utilisateurListModification', (response) => this.loadAll());
    }


    private onError (error) {
        this.alertService.error(error.message, null, null);
    }
}
