import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils } from 'ng-jhipster';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { UtilisateurDetailComponent } from '../../../../../../main/webapp/app/entities/utilisateur/utilisateur-detail.component';
import { UtilisateurService } from '../../../../../../main/webapp/app/entities/utilisateur/utilisateur.service';
import { Utilisateur } from '../../../../../../main/webapp/app/entities/utilisateur/utilisateur.model';

describe('Component Tests', () => {

    describe('Utilisateur Management Detail Component', () => {
        let comp: UtilisateurDetailComponent;
        let fixture: ComponentFixture<UtilisateurDetailComponent>;
        let service: UtilisateurService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [UtilisateurDetailComponent],
                providers: [
                    MockBackend,
                    BaseRequestOptions,
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    {
                        provide: Http,
                        useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
                            return new Http(backendInstance, defaultOptions);
                        },
                        deps: [MockBackend, BaseRequestOptions]
                    },
                    UtilisateurService
                ]
            }).overrideComponent(UtilisateurDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UtilisateurDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UtilisateurService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Utilisateur(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.utilisateur).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
