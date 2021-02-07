import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SandboxSharedModule } from 'app/shared/shared.module';
import { OrganisationComponent } from './organisation.component';
import { OrganisationDetailComponent } from './organisation-detail.component';
import { OrganisationUpdateComponent } from './organisation-update.component';
import { OrganisationDeleteDialogComponent } from './organisation-delete-dialog.component';
import { organisationRoute } from './organisation.route';

@NgModule({
  imports: [SandboxSharedModule, RouterModule.forChild(organisationRoute)],
  declarations: [OrganisationComponent, OrganisationDetailComponent, OrganisationUpdateComponent, OrganisationDeleteDialogComponent],
  entryComponents: [OrganisationDeleteDialogComponent],
})
export class SandboxOrganisationModule {}
