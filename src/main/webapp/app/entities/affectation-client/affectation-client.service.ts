import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, BaseRequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { AffectationClient } from './affectation-client.model';
import { DateUtils } from 'ng-jhipster';
@Injectable()
export class AffectationClientService {

    private resourceUrl = 'api/affectation-clients';

    constructor(private http: Http, private dateUtils: DateUtils) { }

    create(affectationClient: AffectationClient): Observable<AffectationClient> {
        let copy: AffectationClient = Object.assign({}, affectationClient);
        copy.dateDebutMission = this.dateUtils.toDate(affectationClient.dateDebutMission);
        copy.dateFinMission = this.dateUtils.toDate(affectationClient.dateFinMission);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(affectationClient: AffectationClient): Observable<AffectationClient> {
        let copy: AffectationClient = Object.assign({}, affectationClient);

        copy.dateDebutMission = this.dateUtils.toDate(affectationClient.dateDebutMission);

        copy.dateFinMission = this.dateUtils.toDate(affectationClient.dateFinMission);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<AffectationClient> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            let jsonResponse = res.json();
            jsonResponse.dateDebutMission = this.dateUtils
                .convertDateTimeFromServer(jsonResponse.dateDebutMission);
            jsonResponse.dateFinMission = this.dateUtils
                .convertDateTimeFromServer(jsonResponse.dateFinMission);
            return jsonResponse;
        });
    }

    query(req?: any): Observable<Response> {
        let options = this.createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: any) => this.convertResponse(res))
        ;
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }


    private convertResponse(res: any): any {
        let jsonResponse = res.json();
        for (let i = 0; i < jsonResponse.length; i++) {
            jsonResponse[i].dateDebutMission = this.dateUtils
                .convertDateTimeFromServer(jsonResponse[i].dateDebutMission);
            jsonResponse[i].dateFinMission = this.dateUtils
                .convertDateTimeFromServer(jsonResponse[i].dateFinMission);
        }
        res._body = jsonResponse;
        return res;
    }

    private createRequestOption(req?: any): BaseRequestOptions {
        let options: BaseRequestOptions = new BaseRequestOptions();
        if (req) {
            let params: URLSearchParams = new URLSearchParams();
            params.set('page', req.page);
            params.set('size', req.size);
            if (req.sort) {
                params.paramsMap.set('sort', req.sort);
            }
            params.set('query', req.query);

            options.search = params;
        }
        return options;
    }
}
