import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { ActiviteComponent } from './activite.component';
import { ActiviteDetailComponent } from './activite-detail.component';
import { ActivitePopupComponent } from './activite-dialog.component';
import { ActiviteDeletePopupComponent } from './activite-delete-dialog.component';

import { Principal } from '../../shared';


export const activiteRoute: Routes = [
  {
    path: 'activite',
    component: ActiviteComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Activites'
    }
  }, {
    path: 'activite/:id',
    component: ActiviteDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Activites'
    }
  }
];

export const activitePopupRoute: Routes = [
  {
    path: 'activite-new',
    component: ActivitePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Activites'
    },
    outlet: 'popup'
  },
  {
    path: 'activite/:id/edit',
    component: ActivitePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Activites'
    },
    outlet: 'popup'
  },
  {
    path: 'activite/:id/delete',
    component: ActiviteDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Activites'
    },
    outlet: 'popup'
  }
];
