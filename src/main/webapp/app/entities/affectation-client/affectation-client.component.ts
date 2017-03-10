import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, AlertService } from 'ng-jhipster';

import { AffectationClient } from './affectation-client.model';
import { AffectationClientService } from './affectation-client.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-affectation-client',
    templateUrl: './affectation-client.component.html'
})
export class AffectationClientComponent implements OnInit, OnDestroy {
affectationClients: AffectationClient[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private affectationClientService: AffectationClientService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.affectationClientService.query().subscribe(
            (res: Response) => {
                this.affectationClients = res.json();
            },
            (res: Response) => this.onError(res.json())
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInAffectationClients();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId (index: number, item: AffectationClient) {
        return item.id;
    }



    registerChangeInAffectationClients() {
        this.eventSubscriber = this.eventManager.subscribe('affectationClientListModification', (response) => this.loadAll());
    }


    private onError (error) {
        this.alertService.error(error.message, null, null);
    }
}
