import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Activite } from './activite.model';
import { ActiviteService } from './activite.service';
@Injectable()
export class ActivitePopupService {
    private isOpen = false;
    constructor (
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private activiteService: ActiviteService

    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.activiteService.find(id).subscribe(activite => {
                activite.date = this.datePipe
                    .transform(activite.date, 'yyyy-MM-ddThh:mm');
                this.activiteModalRef(component, activite);
            });
        } else {
            return this.activiteModalRef(component, new Activite());
        }
    }

    activiteModalRef(component: Component, activite: Activite): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.activite = activite;
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
