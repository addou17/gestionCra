import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Action } from './action.model';
import { ActionService } from './action.service';

@Component({
    selector: 'jhi-action-detail',
    templateUrl: './action-detail.component.html'
})
export class ActionDetailComponent implements OnInit, OnDestroy {

    action: Action;
    private subscription: any;

    constructor(
        private actionService: ActionService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.actionService.find(id).subscribe(action => {
            this.action = action;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
