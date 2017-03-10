import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { AffectationClient } from './affectation-client.model';
import { AffectationClientService } from './affectation-client.service';
@Injectable()
export class AffectationClientPopupService {
    private isOpen = false;
    constructor (
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private affectationClientService: AffectationClientService

    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.affectationClientService.find(id).subscribe(affectationClient => {
                affectationClient.dateDebutMission = this.datePipe
                    .transform(affectationClient.dateDebutMission, 'yyyy-MM-ddThh:mm');
                affectationClient.dateFinMission = this.datePipe
                    .transform(affectationClient.dateFinMission, 'yyyy-MM-ddThh:mm');
                this.affectationClientModalRef(component, affectationClient);
            });
        } else {
            return this.affectationClientModalRef(component, new AffectationClient());
        }
    }

    affectationClientModalRef(component: Component, affectationClient: AffectationClient): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.affectationClient = affectationClient;
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
