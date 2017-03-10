import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { AffectationClientComponent } from './affectation-client.component';
import { AffectationClientDetailComponent } from './affectation-client-detail.component';
import { AffectationClientPopupComponent } from './affectation-client-dialog.component';
import { AffectationClientDeletePopupComponent } from './affectation-client-delete-dialog.component';

import { Principal } from '../../shared';


export const affectationClientRoute: Routes = [
  {
    path: 'affectation-client',
    component: AffectationClientComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'AffectationClients'
    }
  }, {
    path: 'affectation-client/:id',
    component: AffectationClientDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'AffectationClients'
    }
  }
];

export const affectationClientPopupRoute: Routes = [
  {
    path: 'affectation-client-new',
    component: AffectationClientPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'AffectationClients'
    },
    outlet: 'popup'
  },
  {
    path: 'affectation-client/:id/edit',
    component: AffectationClientPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'AffectationClients'
    },
    outlet: 'popup'
  },
  {
    path: 'affectation-client/:id/delete',
    component: AffectationClientDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'AffectationClients'
    },
    outlet: 'popup'
  }
];
