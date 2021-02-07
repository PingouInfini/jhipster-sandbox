import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'personne',
        loadChildren: () => import('./personne/personne.module').then(m => m.SandboxPersonneModule),
      },
      {
        path: 'organisation',
        loadChildren: () => import('./organisation/organisation.module').then(m => m.SandboxOrganisationModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class SandboxEntityModule {}
