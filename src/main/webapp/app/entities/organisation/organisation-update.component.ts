import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IOrganisation, Organisation } from 'app/shared/model/organisation.model';
import { OrganisationService } from './organisation.service';
import { IPersonne } from 'app/shared/model/personne.model';
import { PersonneService } from 'app/entities/personne/personne.service';

@Component({
  selector: 'jhi-organisation-update',
  templateUrl: './organisation-update.component.html',
})
export class OrganisationUpdateComponent implements OnInit {
  isSaving = false;
  personnes: IPersonne[] = [];

  editForm = this.fb.group({
    id: [],
    appellation: [null, [Validators.required]],
    description: [],
    dateCreation: [],
    personnes: [],
  });

  constructor(
    protected organisationService: OrganisationService,
    protected personneService: PersonneService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ organisation }) => {
      if (!organisation.id) {
        const today = moment().startOf('day');
        organisation.dateCreation = today;
      }

      this.updateForm(organisation);

      this.personneService.query().subscribe((res: HttpResponse<IPersonne[]>) => (this.personnes = res.body || []));
    });
  }

  updateForm(organisation: IOrganisation): void {
    this.editForm.patchValue({
      id: organisation.id,
      appellation: organisation.appellation,
      description: organisation.description,
      dateCreation: organisation.dateCreation ? organisation.dateCreation.format(DATE_TIME_FORMAT) : null,
      personnes: organisation.personnes,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const organisation = this.createFromForm();
    if (organisation.id !== undefined) {
      this.subscribeToSaveResponse(this.organisationService.update(organisation));
    } else {
      this.subscribeToSaveResponse(this.organisationService.create(organisation));
    }
  }

  private createFromForm(): IOrganisation {
    return {
      ...new Organisation(),
      id: this.editForm.get(['id'])!.value,
      appellation: this.editForm.get(['appellation'])!.value,
      description: this.editForm.get(['description'])!.value,
      dateCreation: this.editForm.get(['dateCreation'])!.value
        ? moment(this.editForm.get(['dateCreation'])!.value, DATE_TIME_FORMAT)
        : undefined,
      personnes: this.editForm.get(['personnes'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOrganisation>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IPersonne): any {
    return item.id;
  }

  getSelected(selectedVals: IPersonne[], option: IPersonne): IPersonne {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
