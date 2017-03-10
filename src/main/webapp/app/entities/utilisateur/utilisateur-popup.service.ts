import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Utilisateur } from './utilisateur.model';
import { UtilisateurService } from './utilisateur.service';
@Injectable()
export class UtilisateurPopupService {
    private isOpen = false;
    constructor (
        private modalService: NgbModal,
        private router: Router,
        private utilisateurService: UtilisateurService

    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.utilisateurService.find(id).subscribe(utilisateur => {
                this.utilisateurModalRef(component, utilisateur);
            });
        } else {
            return this.utilisateurModalRef(component, new Utilisateur());
        }
    }

    utilisateurModalRef(component: Component, utilisateur: Utilisateur): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.utilisateur = utilisateur;
        modalRef.result.then(result => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        });
        return modalRef;
    }
}
