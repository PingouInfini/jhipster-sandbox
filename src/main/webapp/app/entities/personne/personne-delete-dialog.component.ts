import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPersonne } from 'app/shared/model/personne.model';
import { PersonneService } from './personne.service';

@Component({
  templateUrl: './personne-delete-dialog.component.html',
})
export class PersonneDeleteDialogComponent {
  personne?: IPersonne;

  constructor(protected personneService: PersonneService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.personneService.delete(id).subscribe(() => {
      this.eventManager.broadcast('personneListModification');
      this.activeModal.close();
    });
  }
}
