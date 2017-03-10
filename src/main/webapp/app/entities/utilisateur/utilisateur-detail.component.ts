import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Utilisateur } from './utilisateur.model';
import { UtilisateurService } from './utilisateur.service';

@Component({
    selector: 'jhi-utilisateur-detail',
    templateUrl: './utilisateur-detail.component.html'
})
export class UtilisateurDetailComponent implements OnInit, OnDestroy {

    utilisateur: Utilisateur;
    private subscription: any;

    constructor(
        private utilisateurService: UtilisateurService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.utilisateurService.find(id).subscribe(utilisateur => {
            this.utilisateur = utilisateur;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
