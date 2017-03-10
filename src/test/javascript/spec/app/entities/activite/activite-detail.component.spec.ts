import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils } from 'ng-jhipster';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ActiviteDetailComponent } from '../../../../../../main/webapp/app/entities/activite/activite-detail.component';
import { ActiviteService } from '../../../../../../main/webapp/app/entities/activite/activite.service';
import { Activite } from '../../../../../../main/webapp/app/entities/activite/activite.model';

describe('Component Tests', () => {

    describe('Activite Management Detail Component', () => {
        let comp: ActiviteDetailComponent;
        let fixture: ComponentFixture<ActiviteDetailComponent>;
        let service: ActiviteService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [ActiviteDetailComponent],
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
                    ActiviteService
                ]
            }).overrideComponent(ActiviteDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ActiviteDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ActiviteService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Activite(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.activite).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
