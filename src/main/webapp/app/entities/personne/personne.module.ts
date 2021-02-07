import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SandboxSharedModule } from 'app/shared/shared.module';
import { PersonneComponent } from './personne.component';
import { PersonneDetailComponent } from './personne-detail.component';
import { PersonneUpdateComponent } from './personne-update.component';
import { PersonneDeleteDialogComponent } from './personne-delete-dialog.component';
import { personneRoute } from './personne.route';

@NgModule({
  imports: [SandboxSharedModule, RouterModule.forChild(personneRoute)],
  declarations: [PersonneComponent, PersonneDetailComponent, PersonneUpdateComponent, PersonneDeleteDialogComponent],
  entryComponents: [PersonneDeleteDialogComponent],
})
export class SandboxPersonneModule {}
