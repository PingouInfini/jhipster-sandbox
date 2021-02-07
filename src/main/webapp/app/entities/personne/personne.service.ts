import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPersonne } from 'app/shared/model/personne.model';

type EntityResponseType = HttpResponse<IPersonne>;
type EntityArrayResponseType = HttpResponse<IPersonne[]>;

@Injectable({ providedIn: 'root' })
export class PersonneService {
  public resourceUrl = SERVER_API_URL + 'api/personnes';

  constructor(protected http: HttpClient) {}

  create(personne: IPersonne): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(personne);
    return this.http
      .post<IPersonne>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(personne: IPersonne): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(personne);
    return this.http
      .put<IPersonne>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPersonne>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPersonne[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(personne: IPersonne): IPersonne {
    const copy: IPersonne = Object.assign({}, personne, {
      dateDeNaissance: personne.dateDeNaissance && personne.dateDeNaissance.isValid() ? personne.dateDeNaissance.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateDeNaissance = res.body.dateDeNaissance ? moment(res.body.dateDeNaissance) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((personne: IPersonne) => {
        personne.dateDeNaissance = personne.dateDeNaissance ? moment(personne.dateDeNaissance) : undefined;
      });
    }
    return res;
  }
}
