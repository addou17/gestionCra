import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { ActionComponent } from './action.component';
import { ActionDetailComponent } from './action-detail.component';
import { ActionPopupComponent } from './action-dialog.component';
import { ActionDeletePopupComponent } from './action-delete-dialog.component';

import { Principal } from '../../shared';


export const actionRoute: Routes = [
  {
    path: 'action',
    component: ActionComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Actions'
    }
  }, {
    path: 'action/:id',
    component: ActionDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Actions'
    }
  }
];

export const actionPopupRoute: Routes = [
  {
    path: 'action-new',
    component: ActionPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Actions'
    },
    outlet: 'popup'
  },
  {
    path: 'action/:id/edit',
    component: ActionPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Actions'
    },
    outlet: 'popup'
  },
  {
    path: 'action/:id/delete',
    component: ActionDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Actions'
    },
    outlet: 'popup'
  }
];
