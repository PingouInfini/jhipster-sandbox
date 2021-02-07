import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SandboxTestModule } from '../../../test.module';
import { PersonneUpdateComponent } from 'app/entities/personne/personne-update.component';
import { PersonneService } from 'app/entities/personne/personne.service';
import { Personne } from 'app/shared/model/personne.model';

describe('Component Tests', () => {
  describe('Personne Management Update Component', () => {
    let comp: PersonneUpdateComponent;
    let fixture: ComponentFixture<PersonneUpdateComponent>;
    let service: PersonneService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SandboxTestModule],
        declarations: [PersonneUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(PersonneUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PersonneUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PersonneService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Personne(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Personne();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
