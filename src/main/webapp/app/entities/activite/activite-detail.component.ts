import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Activite } from './activite.model';
import { ActiviteService } from './activite.service';

@Component({
    selector: 'jhi-activite-detail',
    templateUrl: './activite-detail.component.html'
})
export class ActiviteDetailComponent implements OnInit, OnDestroy {

    activite: Activite;
    private subscription: any;

    constructor(
        private activiteService: ActiviteService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.activiteService.find(id).subscribe(activite => {
            this.activite = activite;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
