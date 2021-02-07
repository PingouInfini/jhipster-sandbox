import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPersonne, Personne } from 'app/shared/model/personne.model';
import { PersonneService } from './personne.service';
import { PersonneComponent } from './personne.component';
import { PersonneDetailComponent } from './personne-detail.component';
import { PersonneUpdateComponent } from './personne-update.component';

@Injectable({ providedIn: 'root' })
export class PersonneResolve implements Resolve<IPersonne> {
  constructor(private service: PersonneService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPersonne> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((personne: HttpResponse<Personne>) => {
          if (personne.body) {
            return of(personne.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Personne());
  }
}

export const personneRoute: Routes = [
  {
    path: '',
    component: PersonneComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'sandboxApp.personne.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PersonneDetailComponent,
    resolve: {
      personne: PersonneResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sandboxApp.personne.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PersonneUpdateComponent,
    resolve: {
      personne: PersonneResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sandboxApp.personne.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PersonneUpdateComponent,
    resolve: {
      personne: PersonneResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sandboxApp.personne.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
