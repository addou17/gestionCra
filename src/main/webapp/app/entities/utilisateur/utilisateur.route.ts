import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { UtilisateurComponent } from './utilisateur.component';
import { UtilisateurDetailComponent } from './utilisateur-detail.component';
import { UtilisateurPopupComponent } from './utilisateur-dialog.component';
import { UtilisateurDeletePopupComponent } from './utilisateur-delete-dialog.component';

import { Principal } from '../../shared';


export const utilisateurRoute: Routes = [
  {
    path: 'utilisateur',
    component: UtilisateurComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Utilisateurs'
    }
  }, {
    path: 'utilisateur/:id',
    component: UtilisateurDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Utilisateurs'
    }
  }
];

export const utilisateurPopupRoute: Routes = [
  {
    path: 'utilisateur-new',
    component: UtilisateurPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Utilisateurs'
    },
    outlet: 'popup'
  },
  {
    path: 'utilisateur/:id/edit',
    component: UtilisateurPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Utilisateurs'
    },
    outlet: 'popup'
  },
  {
    path: 'utilisateur/:id/delete',
    component: UtilisateurDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Utilisateurs'
    },
    outlet: 'popup'
  }
];
