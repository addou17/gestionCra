import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AffectationClient } from './affectation-client.model';
import { AffectationClientService } from './affectation-client.service';

@Component({
    selector: 'jhi-affectation-client-detail',
    templateUrl: './affectation-client-detail.component.html'
})
export class AffectationClientDetailComponent implements OnInit, OnDestroy {

    affectationClient: AffectationClient;
    private subscription: any;

    constructor(
        private affectationClientService: AffectationClientService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.affectationClientService.find(id).subscribe(affectationClient => {
            this.affectationClient = affectationClient;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
